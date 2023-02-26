package com.auction_website.backend.dto;

import java.util.List;

public record UserDTO(
        Long id,
        String username,
        String email,
        String firstName,
        String lastName,
        String phoneNumber,
        String address,
        String taxIdNumber,
        Boolean enabled,
        List<String> userRole,
        Float sellerRating,
        Float bidderRating

) {
}
