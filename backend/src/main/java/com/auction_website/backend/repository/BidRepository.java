package com.auction_website.backend.repository;

import com.auction_website.backend.model.Bid;
import com.auction_website.backend.model.Bidder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    @Query("SELECT b.id FROM Bid b WHERE b.bidder.id=:bidderId")
    List<Long> findBidsIdByBidder_Id(@Param("bidderId") Long bidderId);
    List<Bid> findBidsByBidderAndItem_Id(Bidder bidder, Long itemId);
}
