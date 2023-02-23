package com.auction_website.backend.controller;

import com.auction_website.backend.dto.BidDTO;
import com.auction_website.backend.exception.ResourceNotFoundException;
import com.auction_website.backend.model.User;
import com.auction_website.backend.service.BidService;
import com.auction_website.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/")
@AllArgsConstructor
public class BidController {

    private final BidService bidService;
    private final UserService userService;

    @PostMapping("items/active/{itemId}/new-bid")
    public ResponseEntity<?> saveBid(
            Authentication authentication,
            @PathVariable Long itemId,
            @RequestBody BidDTO bidDTO
    ) {
        return bidService.saveBid(authentication, itemId, bidDTO);
    }

    @GetMapping("{username}/bids")
    public List<BidDTO> getAllMyBids(
            @PathVariable String username,
            Authentication authentication
    ) {
        if (!authentication.getName().equals(username)) {
            throw new ResourceNotFoundException(
                    "Username " + username + " not found!"
            );
        }
        User user = userService.loadUserByUsername(username);
        return bidService.getAllBids(user.getBidder());
    }

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @GetMapping("users/{username}/bids")
    public List<BidDTO> getAllUserBids(@PathVariable String username) {
        User user = userService.loadUserByUsername(username);
        return bidService.getAllBids(user.getBidder());
    }

}
