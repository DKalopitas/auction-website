package com.auction_website.backend.repository;

import com.auction_website.backend.model.Bid;
import com.auction_website.backend.model.Bidder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findBidsByBidder(Bidder bidder);
}
