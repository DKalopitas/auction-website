package com.auction_website.backend.controller;

import com.auction_website.backend.dto.LoginRequest;
import com.auction_website.backend.service.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/authentication")
@AllArgsConstructor
public class AuthenticationController {

    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    @PostMapping()
    public String token(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.username(), loginRequest.password()));
        return tokenService.generateToken(authentication);
    }

}
