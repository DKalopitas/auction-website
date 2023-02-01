package com.auction_website.backend.dto;

public record RegistrationRequest(String username,
                                  String password,
                                  String firstName,
                                  String lastName,
                                  String email,
                                  String phoneNumber,
                                  String address,
                                  String taxIdNumber)
{

}
