package com.auction_website.backend.controller;

import com.auction_website.backend.dto.UserDTO;
import com.auction_website.backend.exception.ResourceNotFoundException;
import com.auction_website.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @GetMapping("{username}")
    public UserDTO getUser(
            @PathVariable String username,
            Authentication authentication
    ) {
        if (!authentication.getName().equals(username)) {
            throw new ResourceNotFoundException(
                    "Username " + username + " not found!"
            );
        }
        return userService.getUser(username);
    }

    @PutMapping("{userId}")
    public void updateUser(
            @PathVariable Long userId,
            @RequestBody UserDTO userDTO
    ) {
        userService.updateUser(userId, userDTO);
    }

    @PutMapping("{userId}/reset-password")
    public void updatePassword(
            @PathVariable Long userId,
            @RequestParam String newPassword
    ) {
        System.out.println(newPassword);
        userService.updatePassword(userId, newPassword);
    }

    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }

}
