package com.auction_website.backend.dto;

import com.auction_website.backend.model.Bidder;

import java.math.BigDecimal;
import java.sql.Timestamp;

public record BidDTO(
        Bidder bidder,
        Timestamp time,
        BigDecimal amount,
        Float bidderRating
) {
}
