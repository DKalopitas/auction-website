package com.auction_website.backend.service;

import com.auction_website.backend.model.User;
import com.auction_website.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
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
    public UserDetails loadUserByUsername(String username)
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

    public String signUpUser(User user, PasswordEncoder encoder) {
        boolean userExists = userRepository
                .findByUsername(user.getUsername())
                .isPresent();

        if (userExists) {
            throw new IllegalStateException("Username already taken");
        }

        String encodedPassword = encoder.encode(user.getPassword());

        user.setPassword(encodedPassword);
        userRepository.save(user);

        return "User Signed Up";
    }

}
