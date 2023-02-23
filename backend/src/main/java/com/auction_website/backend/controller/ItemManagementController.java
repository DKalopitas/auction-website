package com.auction_website.backend.controller;

import com.auction_website.backend.dto.ItemDTO;
import com.auction_website.backend.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/items")
@AllArgsConstructor
public class ItemManagementController {

    private final ItemService itemService;

    @GetMapping
    public List<ItemDTO> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/active")
    public List<ItemDTO> getAllActiveItems() {
        return itemService.getAllActiveItems();
    }

    @GetMapping("{itemId}")
    public ItemDTO getItem(@PathVariable Long itemId) {
        return itemService.getItemDTO(itemId);
    }

    @PostMapping("/new-item")
    public ResponseEntity<?> saveItem(
            Authentication authentication,
            @RequestBody ItemDTO itemDTO
    ) {
        return itemService.saveItem(authentication, itemDTO);
    }

    @PutMapping("{itemId}")
    public void updateItem(
            @PathVariable Long itemId,
            @RequestBody ItemDTO itemDTO
    ) {
        itemService.updateItem(itemId, itemDTO);
    }

    @DeleteMapping("{itemId}")
    public void deleteItem(@PathVariable Long itemId) {
        itemService.deleteItem(itemId);
    }

}
