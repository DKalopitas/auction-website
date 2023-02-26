package com.auction_website.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BidDTO(
        BidderDto bidder,
        LocalDateTime time,
        BigDecimal amount
) {
}
