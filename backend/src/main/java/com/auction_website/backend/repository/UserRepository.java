package com.auction_website.backend.repository;

import com.auction_website.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository  extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
