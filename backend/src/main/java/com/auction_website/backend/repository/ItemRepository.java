package com.auction_website.backend.repository;

import com.auction_website.backend.model.Item;
import com.auction_website.backend.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllBySeller(Seller seller);
}
