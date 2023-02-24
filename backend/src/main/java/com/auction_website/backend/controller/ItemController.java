package com.auction_website.backend.controller;

import com.auction_website.backend.dto.ItemDTO;
import com.auction_website.backend.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/")
@AllArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @GetMapping("items")
    public List<ItemDTO> getAllItems() {
        return itemService.getAllItems();
    }

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @GetMapping("items/{itemId}")
    public ItemDTO getItem(@PathVariable Long itemId) {
        return itemService.getItemDTO(itemId);
    }

    @GetMapping("items/active")
    public List<ItemDTO> getAllActiveItems() {
        return itemService.getAllActiveItems();
    }

    @GetMapping("items/active/{itemId}")
    public ItemDTO getActiveItem(@PathVariable Long itemId) {
        return itemService.getItemDTO(itemId);
    }

    @GetMapping("items/bidded")
    public List<ItemDTO> getBiddedItems(Authentication authentication) {
        return itemService.getAllItemsFromBids(authentication);
    }

    @GetMapping("items/active/bidded")
    public List<ItemDTO> getActiveBiddedItems(Authentication authentication) {
        return itemService.getAllActiveItemsFromBids(authentication);
    }

    @GetMapping("my-items")
    public List<ItemDTO> getAllMyItems(Authentication authentication) {
        return itemService.getAllItems(authentication);
    }

    @GetMapping("my-items/active")
    public List<ItemDTO> getAllMyActiveItems(Authentication authentication) {
        return itemService.getAllActiveItems(authentication);
    }

    @GetMapping("my-items/{itemId}")
    public ItemDTO getMyItem(@PathVariable Long itemId) {
        return itemService.getItemDTO(itemId);
    }

    @PostMapping("my-items/new-item")
    public ResponseEntity<?> saveItem(
            Authentication authentication,
            @RequestBody ItemDTO itemDTO
    ) {
        return itemService.saveItem(authentication, itemDTO);
    }

    @PutMapping("my-items/{itemId}")
    public void updateItem(
            @PathVariable Long itemId,
            @RequestBody ItemDTO itemDTO
    ) {
        itemService.updateItem(itemId, itemDTO);
    }

    @DeleteMapping("my-items/{itemId}")
    public void deleteItem(@PathVariable Long itemId) {
        itemService.deleteItem(itemId);
    }

}
