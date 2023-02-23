package com.auction_website.backend.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

public record ItemDTO(
        Long id,
        String name,
        List<String> categories,
        BigDecimal buyPrice,
        BigDecimal currentPrice,
        BigDecimal firstBid,
        int numberOfBids,
        List<BidDTO> bids,
        String location,
        String country,
        Double latitude,
        Double longitude,
        Timestamp started,
        Timestamp ends,
        float sellerRating,
        String description
) {
}
