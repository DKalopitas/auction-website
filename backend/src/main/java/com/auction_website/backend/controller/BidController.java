package com.auction_website.backend.controller;

import com.auction_website.backend.dto.BidDTO;
import com.auction_website.backend.service.BidService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("api/v1/")
@AllArgsConstructor
public class BidController {

    private final BidService bidService;

    @PostMapping("items/active/{itemId}/new-bid")
    public ResponseEntity<?> saveBid(
            Authentication authentication,
            @PathVariable Long itemId,
            @RequestParam BigDecimal bidAmount
    ) {
        return bidService.saveBid(authentication, itemId, bidAmount);
    }

    @GetMapping("items/bidded/{itemId}")
    List<BidDTO> getBidderBidsInItem(
            Authentication authentication,
            @PathVariable Long itemId
    ) {
        return bidService.getAllBidderBidsInItem(authentication, itemId);
    }

}
