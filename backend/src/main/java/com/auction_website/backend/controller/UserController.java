package com.auction_website.backend.controller;

import com.auction_website.backend.model.User;
import com.auction_website.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/users/{username}")
    public ResponseEntity<?> getUser(@PathVariable("username") String username) {
        return new ResponseEntity<>(userService.loadUserByUsername(username), HttpStatus.OK);
    }

//    @GetMapping("{username}")
//    public ResponseEntity<?> getUser(@PathVariable("username") String username, Authentication authentication) {
//        if (authentication.getName().equals(username)
//                || authentication.getAuthorities().contains("SCOPE_ADMIN")) {
//            return new ResponseEntity<>(userService.loadUserByUsername(username), HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }

    @GetMapping("/profile")
    public Map<String, String> getCurrentUser(Authentication authentication) {
        User currentUser = userService.loadUserByUsername(authentication.getName());
        HashMap<String, String> response = new HashMap<>();
        response.put("firstName", currentUser.getFirstName());
        response.put("lastName", currentUser.getLastName());
        response.put("email", currentUser.getEmail());
        response.put("phoneNumber", currentUser.getPhoneNumber());
        response.put("address", currentUser.getAddress());
        response.put("taxIdNumber", currentUser.getTaxIdNumber());
        response.put("username", currentUser.getUsername());
        return response;
    }

}
