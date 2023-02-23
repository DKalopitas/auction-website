package com.auction_website.backend.dto;

import java.util.List;

public record UserDTO(
        Long id,
        String username,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String address,
        String taxIdNumber,
        Float sellerRating,
        Float bidderRating,
        Boolean enabled,
        List<String> userRole

) {
}
