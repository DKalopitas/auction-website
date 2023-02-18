package com.auction_website.backend.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

public record BidDTO(
        float bidderRating,
        Long userId,
        String location,
        String country,
        Timestamp time,
        BigDecimal amount
) {
}
