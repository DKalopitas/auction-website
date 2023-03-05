package com.auction_website.backend.repository;

import com.auction_website.backend.model.Item;
import com.auction_website.backend.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Boolean existsBySellerAndName(Seller seller, String name);

    List<Item> findAllBySeller(Seller seller);

    List<Item> findAllByStartedBeforeAndEndsAfter(
            Timestamp time1,
            Timestamp time2
    );

    List<Item> findAllBySellerAndStartedBeforeAndEndsAfter(
            Seller seller,
            Timestamp time1,
            Timestamp time2
    );

    List<Item> findDistinctByIdIn(List<Long> bidIds);

    List<Item> findDistinctByIdInAndStartedBeforeAndEndsAfter(
            List<Long> bidIds,
            Timestamp time1,
            Timestamp time2
    );
}
