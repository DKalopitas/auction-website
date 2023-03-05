package com.auction_website.backend.dto;

import com.auction_website.backend.model.Bid;
import com.auction_website.backend.model.Item;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;

@Service
public class ListingItemDTOMapper implements Function<Item, ListingItemDTO> {
    @Override
    public ListingItemDTO apply(Item item) {
        List<Bid> bids = item.getBids();
        int numberOfBids = bids.size();
        return new ListingItemDTO(
                item.getId(),
                item.getName(),
                bids.get(numberOfBids - 1).getAmount(),
                numberOfBids,
                item.getEnds()
        );
    }
}
