package com.auction_website.backend.controller;

import com.auction_website.backend.model.User;
import com.auction_website.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/")
public class UserController {

    private final UserService userService;

//    @Autowired
//    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

//    @PostMapping("/users")
//    public User createUser(@RequestBody User user) {
//        return userRepository.save(user);
//    }
    
}
