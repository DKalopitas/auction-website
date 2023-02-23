package com.auction_website.backend.service;

import com.auction_website.backend.dto.BidDTO;
import com.auction_website.backend.dto.BidDTOMapper;
import com.auction_website.backend.model.Bid;
import com.auction_website.backend.model.Bidder;
import com.auction_website.backend.model.Item;
import com.auction_website.backend.model.User;
import com.auction_website.backend.repository.BidRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BidService {

    private final BidRepository bidRepository;
    private final UserService userService;
    private final ItemService itemService;
    private final BidDTOMapper bidDTOMapper;

    public List<BidDTO> getAllBids(Bidder bidder) {
        return bidRepository
                .findBidsByBidder(bidder)
                .stream()
                .map(bidDTOMapper)
                .collect(Collectors.toList());
    }

    public List<BidDTO> getAllBids(Long itemId) {
        return bidRepository
                .findBidsByItem_Id(itemId)
                .stream()
                .map(bidDTOMapper)
                .collect(Collectors.toList());
    }

    public ResponseEntity<?> saveBid(
            Authentication authentication,
            Long itemId,
            BidDTO bidDTO
    ) {
        if (bidDTO.bidder() != null
                || bidDTO.bidderRating() != null
                || bidDTO.item() != null
                || bidDTO.location() == null
                || bidDTO.location().isBlank()
                || bidDTO.country() == null
                || bidDTO.country().isBlank()
                || bidDTO.time() == null
                || bidDTO.amount() == null
                || itemId == null
        ) {
            throw new IllegalStateException("Invalid Data!");
        }

        User user = userService.loadUserByUsername(authentication.getName());
        Item item = itemService.getItem(itemId);

        if (bidDTO.time().after(item.getStarted())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (bidDTO.amount().compareTo(item.getCurrentPrice()) < 0) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }

        Bid bid = new Bid(
                user.getBidder(),
                item,
                bidDTO.time(),
                bidDTO.amount()
        );
        bidRepository.save(bid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
