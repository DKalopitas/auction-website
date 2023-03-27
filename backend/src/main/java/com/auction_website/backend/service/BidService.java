package com.auction_website.backend.service;

import com.auction_website.backend.dto.BidDTO;
import com.auction_website.backend.dto.BidDTOMapper;
import com.auction_website.backend.model.Bid;
import com.auction_website.backend.model.Item;
import com.auction_website.backend.model.User;
import com.auction_website.backend.repository.BidRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BidService {

    private final BidRepository bidRepository;
    private final UserService userService;
    private final ItemService itemService;
    private final BidDTOMapper bidDTOMapper;

    public List<BidDTO> getAllBidderBidsInItem(
            Authentication authentication,
            Long itemId
    ) {
        User user = userService.loadUserByUsername(authentication.getName());
        return bidRepository
                .findBidsByBidderAndItem_Id(user.getBidder(), itemId)
                .stream()
                .map(bidDTOMapper)
                .collect(Collectors.toList());
    }

    public ResponseEntity<?> saveBid(
            Authentication authentication,
            Long itemId,
            BigDecimal bidAmount
//            BidDTO bidDTO
    ) {
//        if (bidDTO.bidder() != null
//                || bidDTO.amount() == null
//                || itemId == null
//        ) {
//            throw new IllegalStateException("Invalid Data!");
//        }

        User user = userService.loadUserByUsername(authentication.getName());
        Item item = itemService.getItem(itemId);
        List<Bid> itemBids = item.getBids();
        BigDecimal itemCurrentPrice = itemBids
                .get(itemBids.size() - 1)
                .getAmount();
        Timestamp time = Timestamp.valueOf(LocalDateTime.now());

        if (time.before(item.getStarted())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (bidAmount.compareTo(itemCurrentPrice) < 0) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }

        Bid bid = new Bid(
                user.getBidder(),
                item,
                time,
                bidAmount
        );
        bidRepository.save(bid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
