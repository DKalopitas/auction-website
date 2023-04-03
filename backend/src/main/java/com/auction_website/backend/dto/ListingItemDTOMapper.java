package com.auction_website.backend.dto;

import com.auction_website.backend.model.Item;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ListingItemDTOMapper implements Function<Item, ListingItemDTO> {
    @Override
    public ListingItemDTO apply(Item item) {
        return new ListingItemDTO(
                item.getId(),
                item.getName(),
                item.getCurrentPrice(),
                item.getNumberOfBids(),
                item.getEnds()
        );
    }
}
