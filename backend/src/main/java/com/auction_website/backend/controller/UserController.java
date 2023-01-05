package com.auction_website.backend.controller;

import com.auction_website.backend.model.User;
import com.auction_website.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("{username}")
    public ResponseEntity<?> getCurrentUser(@PathVariable("username") String username, Authentication authentication) {
        if (authentication.getName().equals(username)) {
            UserDetails currentUser = userService.loadUserByUsername(username);
            return ResponseEntity.ok().body(
                    currentUser.getUsername()
            );
        }
        return ResponseEntity.notFound().build();
    }

}
