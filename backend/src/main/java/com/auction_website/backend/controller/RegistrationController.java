package com.auction_website.backend.controller;

import com.auction_website.backend.request.RegistrationRequest;
import com.auction_website.backend.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {

    private RegistrationService registrationService;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    @GetMapping
    public String greet() {
        return "Hello Registration!";
    }

}
