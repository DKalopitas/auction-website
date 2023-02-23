package com.auction_website.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data @NoArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ElementCollection
    @CollectionTable(
            name = "category",
            joinColumns = @JoinColumn(name = "item_id")
    )
    @Column(name = "name")
    private List<String> categories;
    @Column(name = "buy_price")
    private BigDecimal buyPrice;
    @Column(name = "current_price")
    private BigDecimal currentPrice;
    @Column(name = "first_bid")
    private BigDecimal firstBid;
    @OneToMany(mappedBy = "item")
    private List<Bid> bids = new ArrayList<>();
    private String location;
    private Double latitude;
    private Double longitude;
    private String country;
    private Timestamp started;
    private Timestamp ends;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(
            name = "seller_id",
            referencedColumnName = "id"
    )
    private Seller seller;
    private String description;

    public Item(
            String name,
            List<String> categories,
            BigDecimal buyPrice,
            BigDecimal firstBid,
            String location,
            String country,
            Double latitude,
            Double longitude,
            Timestamp started,
            Timestamp ends,
            Seller seller,
            String description
    ) {
        this.name = name;
        this.categories = categories;
        this.buyPrice = buyPrice;
        this.firstBid = firstBid;
        currentPrice = firstBid;
        this.location = location;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.started = started;
        this.ends = ends;
        this.seller = seller;
        this.description = description;
    }

}
