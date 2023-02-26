package com.auction_website.backend.dto;

import com.auction_website.backend.model.Item;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemDTOMapper implements Function<Item, ItemDTO> {
    private final BidDTOMapper bidDTOMapper;

    @Override
    public ItemDTO apply(Item item) {
        return new ItemDTO(
                item.getId(),
                item.getName(),
                item.getCategories(),
                item.getBuyPrice(),
                item.getCurrentPrice(),
                item.getFirstBid(),
                item.getBids().size(),
                item
                        .getBids()
                        .stream()
                        .map(bidDTOMapper)
                        .collect(Collectors.toList()),
                item.getLocation(),
                item.getCountry(),
                item.getLatitude(),
                item.getLongitude(),
                item.getStarted(),
                item.getEnds(),
                new SellerDTO(
                        item.getSeller().getRating(),
                        item.getSeller().getUser().getUsername()
                ),
                item.getDescription()
        );
    }
}
