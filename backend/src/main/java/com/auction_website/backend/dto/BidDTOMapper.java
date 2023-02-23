package com.auction_website.backend.dto;

import com.auction_website.backend.model.Bid;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class BidDTOMapper implements Function<Bid, BidDTO> {
    @Override
    public BidDTO apply(Bid bid) {
        return new BidDTO(
                bid.getId(),
                bid.getBidder(),
                bid.getTime(),
                bid.getAmount(),
                bid.getBidder().getRating()
        );
    }
}
