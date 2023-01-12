package com.auction_website.backend.controller;

import com.auction_website.backend.model.User;
import com.auction_website.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserManagementController {

    private final UserService userService;

    @GetMapping()
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("{username}")
    public ResponseEntity<?> getUser(@PathVariable("username") String username) {
        return new ResponseEntity<>(
                userService.loadUserByUsername(username),
                HttpStatus.OK);
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
