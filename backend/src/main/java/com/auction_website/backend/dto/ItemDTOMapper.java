package com.auction_website.backend.dto;

import com.auction_website.backend.model.Item;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.function.Function;

@Service
@AllArgsConstructor
public class ItemDTOMapper implements Function<Item, ItemDTO> {
    private final BidDTOMapper bidDTOMapper;

    @Override
    public ItemDTO apply(Item item) {
        List<BidDTO> bids = item
                .getBids()
                .stream()
                .map(bidDTOMapper)
                .toList();
        int numberOfBids = bids.size();
        BigDecimal currentPrice;
        if (numberOfBids == 0) {
            currentPrice = item.getFirstBid();
        } else {
            currentPrice = bids.get(numberOfBids - 1).amount();
        }

        return new ItemDTO(
                item.getId(),
                item.getName(),
                item.getCategories(),
                item.getBuyPrice(),
                currentPrice,
                item.getFirstBid(),
                numberOfBids,
                bids,
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
