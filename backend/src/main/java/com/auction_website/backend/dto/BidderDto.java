package com.auction_website.backend.dto;

public record BidderDto(
        Float rating,
        String UserID,
        String location,
        String country
) {
}
