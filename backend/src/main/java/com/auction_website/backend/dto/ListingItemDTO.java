package com.auction_website.backend.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

public record ListingItemDTO(
        Long id,
        String name,
        BigDecimal currentPrice,
        int numberOfBids,
        Timestamp ends
) {
}
