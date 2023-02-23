package com.auction_website.backend.dto;

import com.auction_website.backend.model.Bidder;
import com.auction_website.backend.model.Item;

import java.math.BigDecimal;
import java.sql.Timestamp;

public record BidDTO(
        Long id,
        Bidder bidder,
        Item item,
        String location,
        String country,
        Timestamp time,
        BigDecimal amount,
        Float bidderRating
) {
}
