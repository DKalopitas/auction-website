package com.auction_website.backend.dto;

import com.auction_website.backend.model.Bid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@AllArgsConstructor
public class BidDTOMapper implements Function<Bid, BidDTO> {

    private final BidderDTOMapper bidderDTOMapper;

    @Override
    public BidDTO apply(Bid bid) {
        return new BidDTO(
                bidderDTOMapper.apply(bid.getBidder()),
                bid.getTime().toLocalDateTime(),
                bid.getAmount()
        );
    }
}
