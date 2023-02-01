package com.auction_website.backend.dto;

import java.util.List;

public record UserDTO(
        Long id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String address,
        String taxIdNumber,
        Boolean enabled,
        List<String> userRole,
        String username
) {
}
