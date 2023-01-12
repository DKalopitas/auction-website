package com.auction_website.backend.service;

import com.auction_website.backend.model.User;
import com.auction_website.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public User loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format("User with username %s not found",
                                username))
                );
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public ResponseEntity<?> signUpUser(User user, PasswordEncoder encoder) {
        boolean userExists = userRepository
                .findByUsername(user.getUsername())
                .isPresent();

        if (userExists) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        String encodedPassword = encoder.encode(user.getPassword());

        user.setPassword(encodedPassword);
        userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.OK);
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

    public void updateUser(Long id, User user) {
        boolean userExists = userRepository.existsById(id);
        if (!userExists) {
            throw new IllegalStateException(
                    "User with id " + id + "doesn't exist!"
            );
        }
        userRepository.save(user);
    }

}
