package com.auction_website.backend.dto;

import com.auction_website.backend.model.Bid;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class BidDTOMapper implements Function<Bid, BidDTO> {
    @Override
    public BidDTO apply(Bid bid) {
        return new BidDTO(
                bid.getBidder().getRating(),
                bid.getBidder().getUser().getId(),
                bid.getBidder().getLocation(),
                bid.getBidder().getCountry(),
                bid.getTime(),
                bid.getAmount()
        );
    }
}
