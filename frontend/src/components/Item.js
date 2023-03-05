import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../api/axios';
import ErrorPopup from './ErrorPopup';

function Item() {

    const location = useLocation();
    const itemId = location.state?.itemId
    const [item, setItem] = useState({
        id: "",
        name: "",
        categories: [],
        buyPrice: "",
        currentPrice: "",
        firstBid: "",
        numberOfBids: "",
        bids: [],
        location: "",
        country: "",
        latitude: "",
        longitude: "",
        started: "",
        ends: "",
        seller: {},
        description: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get(`/items/active/${itemId}`);
                // console.log(response?.data);
                setItem({
                    id: response.data.id,
                    name: response.data.name,
                    categories: response.data.categories,
                    buyPrice: response.data.buyPrice,
                    currentPrice: response.data.currentPrice,
                    firstBid: response.data.firstBid,
                    numberOfBids: response.data.numberOfBids,
                    bids: response.data.bids,
                    location: response.data.location,
                    country: response.data.country,
                    latitude: response.data.latitude,
                    longitude: response.data.longitude,
                    started: response.data.started,
                    ends: response.data.ends,
                    seller: response.data.seller,
                    description: response.data.description
                });
            } catch(error) {
                // console.log(error);
                setErrorMessage(error?.message);
            }
        }
        fetchData();

        // if (fetchResponceStatus === true) {
        //     const interval = setInterval(() => {
        //             fetchData();
        //     }, 30000);
        //     return () => clearInterval(interval);
        // }

    }, [itemId]);

    return (
        <div>
            <div className="text-white">
                {
                    Object.keys(item).map(key => {
                        if (key === "id"
                        // || key === "bids"
                        ) {
                            return (null);
                        }
                        if (key === "categories") {
                            return (
                                <div key={key}>Categories:
                                    {
                                        item.categories.map((category) => {
                                            return (
                                                <div key={category}>
                                                    {category}
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            );
                        }
                        if (key === "bids") {
                            return (
                                <div key={key}>Bids:
                                    {
                                        item.bids.map((bid) => {
                                            return (
                                                <div key={bid.id}>Bid:
                                                    {
                                                        Object.keys(bid).map(key => {
                                                            if (key === "bidder") {
                                                                return (
                                                                    <div key={String(bid.id) + key}>
                                                                        {
                                                                            Object.keys(bid.bidder).map(key => {
                                                                                return (
                                                                                    <div key={String(bid.id) + key}>
                                                                                        {bid.bidder[key]}
                                                                                    </div>
                                                                                );
                                                                            })
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                            return (
                                                                <div key={String(bid.id) + key}>
                                                                    {bid[key]}
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            );
                        }
                        if (key === "seller") {
                            return (
                                <div key={key}>
                                    <div key="sellerRating">
                                        {item?.key?.rating}
                                    </div>

                                    <div key="sellerUsername">
                                        {item?.key?.UserID}
                                    </div>
                                </div>
                            );
                        }
                        return(
                            <div key={key}>{item[key]}</div>
                        );
                    })
                }
            </div>
            { errorMessage ? <ErrorPopup errorMessage={errorMessage} /> : null }
        </div>
    );
}

export default Item;