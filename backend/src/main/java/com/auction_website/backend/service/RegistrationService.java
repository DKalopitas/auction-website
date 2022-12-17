package com.auction_website.backend.service;

import com.auction_website.backend.model.User;
import com.auction_website.backend.model.UserRole;
import com.auction_website.backend.request.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserService userService;

    public String register(RegistrationRequest request) {
        return userService.signUpUser(new User(
                request.getUsername(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                request.getPhoneNumber(),
                request.getAddress(),
                request.getTaxIdNumber(),
                UserRole.USER
        ));
    }
}
