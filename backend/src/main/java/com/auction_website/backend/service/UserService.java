package com.auction_website.backend.service;

import com.auction_website.backend.dto.UserDTO;
import com.auction_website.backend.dto.UserDTOMapper;
import com.auction_website.backend.exception.ResourceNotFoundException;
import com.auction_website.backend.model.User;
import com.auction_website.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User with username " + username + " not found!"
                        )
                );
    }

    public List<UserDTO> getUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    public UserDTO getUser(String username) {
        return userDTOMapper.apply(loadUserByUsername(username));
    }

    public void deleteUser(Long id) {
        boolean userExists = userRepository.existsById(id);
        if (!userExists) {
            throw new IllegalStateException(
                    "User with id " + id + "doesn't exist!"
            );
        }
        userRepository.deleteById(id);
    }

    public void updateUser(Long id, UserDTO userDTO) {
        boolean userExists = userRepository.existsById(id);
        if (!userExists) {
            throw new ResourceNotFoundException(
                    "User with id " + id + "doesn't exist!"
            );
        }
        User user = userRepository.getReferenceById(id);
        boolean changes = false;

        if (userDTO.firstName() != null && !userDTO.firstName().equals(user.getFirstName())) {
            user.setFirstName(userDTO.firstName());
            changes = true;
        }

        if (userDTO.lastName() != null && !userDTO.lastName().equals(user.getLastName())) {
            user.setLastName(userDTO.lastName());
            changes = true;
        }

        if (userDTO.email() != null && !userDTO.email().equals(user.getEmail())) {
            user.setEmail(userDTO.email());
            changes = true;
        }

        if (userDTO.phoneNumber() != null && !userDTO.phoneNumber().equals(user.getPhoneNumber())) {
            user.setPhoneNumber(userDTO.phoneNumber());
            changes = true;
        }

        if (userDTO.address() != null && !userDTO.address().equals(user.getAddress())) {
            user.setAddress(userDTO.address());
            changes = true;
        }

        if (userDTO.taxIdNumber() != null && !userDTO.taxIdNumber().equals(user.getTaxIdNumber())) {
            user.setTaxIdNumber(userDTO.taxIdNumber());
            changes = true;
        }

        if (userDTO.username() != null && !userDTO.username().equals(user.getUsername())) {
            if (userRepository.findByUsername(userDTO.username()).isPresent()) {
                throw new IllegalStateException("Username already taken!");
            }
            user.setUsername(userDTO.username());
            changes = true;
        }

        if (!changes) {
            throw new IllegalStateException("No data changes found!");
        }
        userRepository.save(user);
    }

    public void updatePassword(Long id, String newPassword) {
        User user = userRepository.getReferenceById(id);
        if (newPassword != null && !passwordEncoder.matches(newPassword, user.getPassword())) {
            String encodedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(encodedPassword);
            userRepository.save(user);
        }
    }

}
