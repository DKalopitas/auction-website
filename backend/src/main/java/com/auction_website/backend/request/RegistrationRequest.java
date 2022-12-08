package com.auction_website.backend.request;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor @Getter @EqualsAndHashCode @ToString
public class RegistrationRequest {

    private final String username;
    private final String password;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String phoneNumber;
    private final String address;
    private final String taxIdNumber;

}
