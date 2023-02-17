package com.auction_website.backend.service;

import com.auction_website.backend.model.*;
import com.auction_website.backend.repository.*;
import com.auction_website.backend.dto.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BidRepository bidRepository;
    private final ItemRepository itemRepository;

    public ResponseEntity<?> register(RegistrationRequest request) {
        boolean userExists = userRepository
                .findByUsername(request.username())
                .isPresent();
        if (userExists) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        User user = new User(
                request.username(),
                request.password(),
                request.firstName(),
                request.lastName(),
                request.email(),
                request.phoneNumber(),
                request.address(),
                request.taxIdNumber(),
                UserRole.USER
        );
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Bean
    public CommandLineRunner initializeDatabase() {
        if (userRepository.existsById(1L)) {
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
            String encodedPassword = passwordEncoder.encode(admin.getPassword());
            admin.setPassword(encodedPassword);
            userRepository.save(admin);
        };
    }

}
