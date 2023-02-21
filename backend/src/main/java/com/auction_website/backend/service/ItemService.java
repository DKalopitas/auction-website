package com.auction_website.backend.service;

import com.auction_website.backend.dto.ItemDTO;
import com.auction_website.backend.dto.ItemDTOMapper;
import com.auction_website.backend.exception.ResourceNotFoundException;
import com.auction_website.backend.model.Item;
import com.auction_website.backend.model.User;
import com.auction_website.backend.repository.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final UserService userService;
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

    public ItemDTO getItem(Long itemId) {
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
            ItemDTO itemDTO,
            Authentication authentication
    ) {
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

    public void updateItem(ItemDTO itemDTO) {
        Item item = itemRepository
                .findById(itemDTO.id())
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Item with id " + itemDTO.id() + " not found!"
                        )
                );

        boolean changed = false;

        if (!itemDTO.name().equals(item.getName())) {
            item.setName(itemDTO.name());
            changed = true;
        }
        if (!itemDTO.categories().equals(item.getCategories())) {
            item.setCategories(itemDTO.categories());
            changed = true;
        }
        if (!itemDTO.buyPrice().equals(item.getBuyPrice())) {
            item.setBuyPrice(itemDTO.buyPrice());
            changed = true;
        }
        if (!itemDTO.firstBid().equals(item.getFirstBid())) {
            item.setFirstBid(itemDTO.firstBid());
            changed = true;
        }
        if (!itemDTO.location().equals(item.getLocation())) {
            item.setLocation(itemDTO.location());
            changed = true;
        }
        if (!itemDTO.country().equals(item.getCountry())) {
            item.setCountry(itemDTO.country());
            changed = true;
        }
        if (!itemDTO.latitude().equals(item.getLatitude())) {
            item.setLatitude(itemDTO.latitude());
            changed = true;
        }
        if (!itemDTO.longitude().equals(item.getLongitude())) {
            item.setLongitude(itemDTO.longitude());
            changed = true;
        }
        if (!itemDTO.started().equals(item.getStarted())) {
            item.setStarted(itemDTO.started());
            changed = true;
        }
        if (!itemDTO.ends().equals(item.getEnds())) {
            item.setEnds(itemDTO.ends());
            changed = true;
        }
        if (!itemDTO.description().equals(item.getDescription())) {
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
