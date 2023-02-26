package com.auction_website.backend.dto;

import com.auction_website.backend.model.Bidder;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class BidderDTOMapper implements Function<Bidder, BidderDto> {
    @Override
    public BidderDto apply(Bidder bidder) {
        return new BidderDto(
                bidder.getRating(),
                bidder.getUser().getUsername(),
                bidder.getLocation(),
                bidder.getCountry()
        );
    }
}
