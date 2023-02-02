package com.auction_website.backend.controller;

import com.auction_website.backend.dto.UserDTO;
import com.auction_website.backend.exception.ResourceNotFoundException;
import com.auction_website.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @GetMapping("{username}")
    public UserDTO getUser(@PathVariable("username") String username,
                                           Authentication authentication) {
        if (!authentication.getName().equals(username)) {
            throw new ResourceNotFoundException("Username " + username + " not found!");
        }
        return userService.getUser(username);
    }

    @PutMapping("{userId}")
    public void updateUser(@PathVariable("userId") Long id, @RequestBody UserDTO userDTO) {
        userService.updateUser(id, userDTO);
    }

    @PutMapping("{userId}/reset-password")
    public void updatePassword(@PathVariable("userId") Long id, @RequestParam String newPassword) {
        System.out.println(newPassword);
        userService.updatePassword(id, newPassword);
    }

    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable("userId") Long id) {
        userService.deleteUser(id);
    }

}
