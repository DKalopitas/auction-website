package com.auction_website.backend.controller;

import com.auction_website.backend.model.User;
import com.auction_website.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @GetMapping("{username}")
    public ResponseEntity<?> getUser(@PathVariable("username") String username,
                                     Authentication authentication) {
        if (authentication.getName().equals(username)) {
            return new ResponseEntity<>(userService.loadUserByUsername(username), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("{userId}")
    public void updateUser(@PathVariable("userId") Long id, @RequestBody User user) {
        userService.updateUser(id, user);
    }

    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable("userId") Long id) {
        userService.deleteUser(id);
    }

}
