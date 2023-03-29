import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';
import axios from '../api/axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import ErrorPopup from './ErrorPopup';
import TimeDifference from './TimeDifference';

const bidRegex = new RegExp("^(\\d{1,3}(\\,\\d{3})*|(\\d+))(\\.\\d{2})?$");

function Item() {

    const location = useLocation();
    const isAuthenticated = useIsAuthenticated();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
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
    const [bidValue, setBidValue] = useState();
    const [bidError, setBidError] = useState();
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
            const interval = setInterval(() => {
                    fetchData();
            }, 5000);
            return () => clearInterval(interval);
        // }

    }, [itemId]);

    function handleEndsAtTime() {
        const endsAt = new Date(item.ends);
        const currentDate = new Date();
        const daysDifference = Math.floor((endsAt.getTime() - currentDate.getTime()) / (24*3600*1000));
        const endMonth = endsAt.toLocaleString("en-us", { month: "long" });
        if (daysDifference > 30) {
            return (
                <div>
                    {
                        endMonth
                        + " " 
                        + endsAt.getDate()
                        + " " 
                        + endsAt.getFullYear()
                    }
                </div>
            );
        }
        if (daysDifference > 6) {
            return (
                <div>
                    {
                        endMonth
                        + " " 
                        + endsAt.getDate()
                    }
                </div>
            );
        }
        const endDay = endsAt.toLocaleString("en-us", { day: "long" });
        const endHoursMinutes = endsAt.toLocaleString("en-us", { 
                hour: 'numeric', 
                minute: 'numeric', 
                hour12: true
        })
        if (daysDifference > 1) {
            return (
                <div>
                    {
                        endDay
                        + " "
                        + endHoursMinutes
                    }
                </div>
            );
        }
        if (daysDifference === 1) {
            return (
                <div>
                    { "Tomorrow at " + endHoursMinutes }
                </div>
            );
        }
        return (
            <div>
                { "Today at " + endHoursMinutes }
            </div>
        );
    }

    function displayBuyChoice() {
        if (item.buyPrice > 0) {
            return (
                <div className="row d-flex mt-4">
                    <div className="col d-flex gap-2 align-items-center">
                        Buy Price: 
                        <div className="fs-3 ms-2">
                        {item.buyPrice + "$"}
                        </div>
                    </div>

                    <div className="col-6">
                        <button 
                        className="btn btn-outline-light btn-lg px-5"
                        onClick={handleBuyRequest}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            );
        }
    }

    function handleBidInputChange(e) {
        setBidValue(e.target.value);
        setBidError();
    }

    async function handleBidRequest() {
        if (!isAuthenticated()) {
            navigate("/log-in");
        }
        if (!bidRegex.test(bidValue)) {
            setBidError("Invalid Value");
            return;
        }
        if (bidValue < item.currentPrice) {
            setBidError("The amount must be higher than current bid");
            return;
        }
        try {
            await axiosPrivate.post(
                `/items/active/${item.id}/new-bid`, 
                {}, 
                { 
                    params: {bidAmount: bidValue} 
                }
            );
            setItem({ ...item, currentPrice: bidValue });
        } catch(error) {
            console.log(error);
            setErrorMessage(error?.message);
        }
    }

    function handleBuyRequest() {
        if (!isAuthenticated()) {
            navigate("/log-in");
        }
        console.log(item.buyPrice);
    }

    return (
        <div>
            <div className="bg-dark text-white text-center rounded-3 p-4 m-5 col-8 mx-auto">
                <div className="mb-4 fs-3">
                    {item.name}
                </div>

                <div className="row d-flex justify-content-center">
                    <div className="text-center me-5 col-4 border border-1">
                        <img
                        // src="../../public/logo192.png"
                        alt=""
                        className="mb-2"
                        style={{height: "200px", width: "200px"}}
                        />
                    </div>

                    <div className="col-7 fs-5">
                        <div className="row d-flex justify-content-between">
                            <div className="d-flex gap-2 col align-items-center">
                                Ends in:
                                <TimeDifference date={item.ends} />
                                |
                                <div>
                                    {handleEndsAtTime()}
                                </div>
                            </div>
                            
                            <div className="col-6 d-flex flex-column align-items-end">
                                    <div>
                                        Location: {item.location + ", " + item.country}
                                    </div>

                                    <div>
                                        Seller: {item.seller?.UserID}
                                    </div>
                                    
                                    <div className="fs-6">
                                        Rating: {item.seller?.rating} / 5
                                    </div>
                            </div>
                        </div>

                        <hr />

                        <div className="row d-flex justify-content-between">
                            <div className="d-flex col">
                                <div className="d-flex flex-column justify-content-between my-2">
                                    <div className="d-flex gap-2 align-items-center">
                                        Current Bid:
                                        <div className="fs-3 ms-2">
                                            {item.currentPrice + "$"}
                                        </div>
                                    </div>

                                    <div className="fs-6">
                                        {
                                            (item.numberOfBids === 1) ?
                                                "[" + item.numberOfBids + " Bid]"
                                            :
                                                "[" + item.numberOfBids + " Bids]"
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 d-flex flex-column justify-content-center">
                                <div className="d-flex align-items-center ms-4">
                                    <button 
                                    className="btn btn-outline-light btn-lg px-4 col-5"
                                    onClick={handleBidRequest}
                                    >
                                        Place Bid
                                    </button>

                                    <div className="d-flex justify-content-center">
                                        <div className="col-md-9">
                                            <input 
                                            className="form-control fs-5"
                                            placeholder={item.currentPrice}
                                            onChange={(e) => handleBidInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-danger fs-6">
                                    {bidError}
                                </div>
                            </div>
                        </div>

                        {displayBuyChoice()}

                        <hr />

                        <div className="row d-flex justify-content-between">
                            <div className="text-start">
                                Description: 
                                <div>
                                    {item.description}
                                </div>
                            </div>
                        </div>

                        <div className="text-start mt-3">
                            Categories:
                            <div className="fs-6" style={{width: "300px"}}>
                                {item.categories.join(", ")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { errorMessage ? <ErrorPopup errorMessage={errorMessage} /> : null }
        </div>
    );
}

export default Item;