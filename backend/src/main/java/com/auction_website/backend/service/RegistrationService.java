package com.auction_website.backend.service;

import com.auction_website.backend.model.User;
import com.auction_website.backend.model.UserRole;
import com.auction_website.backend.repository.UserRepository;
import com.auction_website.backend.request.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public String register(RegistrationRequest request) {
        return userService.signUpUser(new User(
                request.username(),
                request.password(),
                request.firstName(),
                request.lastName(),
                request.email(),
                request.phoneNumber(),
                request.address(),
                request.taxIdNumber(),
                UserRole.USER
        ), passwordEncoder);
    }

    @Bean
    public CommandLineRunner initializeDatabase() {
        if (userRepository.findByUsername("admin").isPresent()) {
            return args -> {};
        }
        return args -> {
            User admin = new User(
                    "admin",
                    "admin",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    UserRole.ADMIN
            );
            admin.setEnabled(true);
            userService.signUpUser(admin, passwordEncoder);
        };
    }

}
