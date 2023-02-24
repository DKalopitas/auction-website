package com.auction_website.backend.service;

import com.auction_website.backend.dto.ItemDTO;
import com.auction_website.backend.dto.ItemDTOMapper;
import com.auction_website.backend.exception.ResourceNotFoundException;
import com.auction_website.backend.model.Item;
import com.auction_website.backend.model.User;
import com.auction_website.backend.repository.BidRepository;
import com.auction_website.backend.repository.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final UserService userService;
    private final BidRepository bidRepository;
    private final ItemDTOMapper itemDTOMapper;

    public List<ItemDTO> getAllItems() {
        return itemRepository
                .findAll()
                .stream()
                .map(itemDTOMapper)
                .collect(Collectors.toList());
    }

    public List<ItemDTO> getAllActiveItems() {
        return itemRepository
                .findAllByStartedIsBefore(Timestamp.valueOf(LocalDateTime.now()))
                .stream()
                .map(itemDTOMapper)
                .collect(Collectors.toList());
    }

    public List<ItemDTO> getAllItems(Authentication authentication) {
        User user = userService.loadUserByUsername(authentication.getName());
        return itemRepository
                .findAllBySeller(user.getSeller())
                .stream()
                .map(itemDTOMapper)
                .collect(Collectors.toList());
    }

    public List<ItemDTO> getAllActiveItems(Authentication authentication) {
        User user = userService.loadUserByUsername(authentication.getName());
        return itemRepository
                .findAllBySellerAndStartedIsBefore(
                        user.getSeller(),
                        Timestamp.valueOf(LocalDateTime.now())
                )
                .stream()
                .map(itemDTOMapper)
                .collect(Collectors.toList());
    }

    public List<ItemDTO> getAllItemsFromBids(Authentication authentication) {
        User user = userService.loadUserByUsername(authentication.getName());
        List<Long> bidIds = bidRepository.findBidsIdByBidder_Id(user.getBidder().getId());
        return itemRepository
                .findDistinctByIdIn(bidIds)
                .stream()
                .map(itemDTOMapper)
                .collect(Collectors.toList());
    }

    public List<ItemDTO> getAllActiveItemsFromBids(Authentication authentication) {
        User user = userService.loadUserByUsername(authentication.getName());
        List<Long> bidIds = bidRepository.findBidsIdByBidder_Id(user.getBidder().getId());
        return itemRepository
                .findDistinctByIdInAndStartedIsBefore(
                        bidIds, Timestamp.valueOf(LocalDateTime.now())
                )
                .stream()
                .map(itemDTOMapper)
                .collect(Collectors.toList());
    }

    public Item getItem(Long itemId) {
        return itemRepository
                .findById(itemId)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Item with id " + itemId + " not found!"
                        )
                );
    }

    public ItemDTO getItemDTO(Long itemId) {
        Item item = itemRepository
                .findById(itemId)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                        "Item with id " + itemId + " not found!"
                        )
                );
        return itemDTOMapper.apply(item);
    }

    public ResponseEntity<?> saveItem(
            Authentication authentication,
            ItemDTO itemDTO
    ) {
        if (itemDTO.id() != null
                || itemDTO.name() == null
                || itemDTO.name().isBlank()
                || itemDTO.categories() == null
                || itemDTO.categories().isEmpty()
                || itemDTO.categories().stream().anyMatch(String::isBlank)
                || itemDTO.buyPrice() == null
                || itemDTO.firstBid() == null
                || itemDTO.location() == null
                || itemDTO.location().isBlank()
                || itemDTO.country() == null
                || itemDTO.country().isBlank()
                || itemDTO.started() == null
                || itemDTO.ends() == null
                || itemDTO.description() == null
                || itemDTO.description().isBlank()
        ) {
            throw new IllegalStateException("Invalid Data!");
        }

        User currentUser = userService
                .loadUserByUsername(authentication.getName());

        if (itemRepository
                .existsBySellerAndName(currentUser.getSeller(), itemDTO.name())
        ) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Item item = new Item(
                itemDTO.name(),
                itemDTO.categories(),
                itemDTO.buyPrice(),
                itemDTO.firstBid(),
                itemDTO.location(),
                itemDTO.country(),
                itemDTO.latitude(),
                itemDTO.longitude(),
                itemDTO.started(),
                itemDTO.ends(),
                currentUser.getSeller(),
                itemDTO.description()
        );
        itemRepository.save(item);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public void updateItem(Long itemId, ItemDTO itemDTO) {
        if (!itemId.equals(itemDTO.id())) {
            throw new IllegalStateException("Invalid Id!");
        }

        Item item = itemRepository
                .findById(itemId)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Item with id " + itemDTO.id() + " not found!"
                        )
                );

        boolean changed = false;

        if (itemDTO.name() != null
                && !itemDTO.name().isBlank()
                && !itemDTO.name().equals(item.getName())
        ) {
            item.setName(itemDTO.name());
            changed = true;
        }
        if (itemDTO.categories() != null
                && !itemDTO.categories().isEmpty()
                && itemDTO.categories().stream().noneMatch(String::isBlank)
                && !itemDTO.categories().equals(item.getCategories())
        ) {
            item.setCategories(itemDTO.categories());
            changed = true;
        }
        if (itemDTO.buyPrice() != null
                && !itemDTO.buyPrice().equals(item.getBuyPrice())
        ) {
            item.setBuyPrice(itemDTO.buyPrice());
            changed = true;
        }
        if (itemDTO.firstBid() != null
                && !itemDTO.firstBid().equals(item.getFirstBid())
        ) {
            item.setFirstBid(itemDTO.firstBid());
            changed = true;
        }
        if (itemDTO.location() != null
                && !itemDTO.location().isBlank()
                && !itemDTO.location().equals(item.getLocation())
        ) {
            item.setLocation(itemDTO.location());
            changed = true;
        }
        if (itemDTO.country() != null
                && !itemDTO.country().isBlank()
                && !itemDTO.country().equals(item.getCountry())
        ) {
            item.setCountry(itemDTO.country());
            changed = true;
        }
        if (itemDTO.latitude() != null
                && !itemDTO.latitude().equals(item.getLatitude())
        ) {
            item.setLatitude(itemDTO.latitude());
            changed = true;
        }
        if (itemDTO.longitude() != null
                && !itemDTO.longitude().equals(item.getLongitude())
        ) {
            item.setLongitude(itemDTO.longitude());
            changed = true;
        }
        if (itemDTO.started() != null
                && !itemDTO.started().equals(item.getStarted())
        ) {
            item.setStarted(itemDTO.started());
            changed = true;
        }
        if (itemDTO.ends() != null
                && !itemDTO.ends().equals(item.getEnds())
        ) {
            item.setEnds(itemDTO.ends());
            changed = true;
        }
        if (itemDTO.description() != null
                && !itemDTO.description().isBlank()
                && !itemDTO.description().equals(item.getDescription())
        ) {
            item.setDescription(itemDTO.description());
            changed = true;
        }
        if (!changed) {
            throw new IllegalStateException("No data changes found!");
        }
        itemRepository.save(item);
    }

    public void deleteItem(Long itemId) {
        if (!itemRepository.existsById(itemId)) {
            throw new ResourceNotFoundException(
                    "Item with id " + itemId + " not found!"
            );
        }
        itemRepository.deleteById(itemId);
    }
}
