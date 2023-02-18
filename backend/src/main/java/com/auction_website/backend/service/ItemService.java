package com.auction_website.backend.service;

import com.auction_website.backend.dto.ItemDTO;
import com.auction_website.backend.dto.ItemDTOMapper;
import com.auction_website.backend.dto.UserDTO;
import com.auction_website.backend.exception.ResourceNotFoundException;
import com.auction_website.backend.model.User;
import com.auction_website.backend.repository.ItemRepository;
import com.auction_website.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final ItemDTOMapper itemDTOMapper;

    public List<ItemDTO> getAllItems() {
        return itemRepository
                .findAll()
                .stream()
                .map(itemDTOMapper)
                .collect(Collectors.toList());
    }

    public List<ItemDTO> getAllItems(UserDTO userDTO) {
        User user = userRepository.getReferenceById(userDTO.id());
        return itemRepository
                .findAllBySeller(user.getSeller())
                .stream()
                .map(itemDTOMapper)
                .collect(Collectors.toList());
    }

    public ItemDTO getItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Item not found!");
        }
        return itemDTOMapper.apply(itemRepository.getReferenceById(id));
    }
}
