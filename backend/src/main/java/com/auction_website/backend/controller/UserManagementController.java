package com.auction_website.backend.controller;

import com.auction_website.backend.dto.UserDTO;
import com.auction_website.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserManagementController {

    private final UserService userService;

    @GetMapping()
    public List<UserDTO> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("{username}")
    public UserDTO getUser(@PathVariable("username") String username) {
        return userService.getUser(username);
    }

    @PutMapping("{userId}")
    public void updateUser(@PathVariable("userId") Long id, @RequestBody UserDTO userDTO) {
        userService.updateUser(id, userDTO);
    }

    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable("userId") Long id) {
        userService.deleteUser(id);
    }

}
