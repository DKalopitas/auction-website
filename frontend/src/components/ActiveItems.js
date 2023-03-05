import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import ErrorPopup from './ErrorPopup'
import Countdown from 'react-countdown';

function ActiveItems() {

    const navigate = useNavigate();
    const [itemList, setItemList] = useState([]);
    const [fetchResponceStatus, setFetchResponseStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get("/items/active");
                // console.log(response?.data);
                setFetchResponseStatus(true);
                setItemList(response.data);
            } catch(error) {
                // console.log(error);
                setErrorMessage(error?.message);
            }
        }
        fetchData();

        if (fetchResponceStatus === true) {
            const interval = setInterval(() => {
                    fetchData();
            }, 30000);
            return () => clearInterval(interval);
        }

    }, [fetchResponceStatus]);

    function handleTimeDifferenceFromNow(date) {
        const endsAt = new Date(date);
        // const endsAt = new Date(2023, 2, 4, 22, 55, 0);
        const currentDate = new Date();
        if (endsAt.getFullYear() > currentDate.getFullYear()) {
            return (String(endsAt.getFullYear()));
        }
        const daysDifference = Math.floor((endsAt.getTime() - currentDate.getTime()) / (24*3600*1000));
        if (daysDifference > 30) {
            const monthDifference = endsAt.getMonth() - currentDate.getMonth();
            if (monthDifference === 1) {
                return (String(monthDifference) + " month");
            }
            return (String(monthDifference) + " months");
        }
        if (daysDifference > 0) {
            if (daysDifference === 1) {
                return (String(daysDifference) + " day");
            }
            return (String(daysDifference) + " days");
        }
        return (
            <Countdown 
            date={endsAt} 
            renderer={countdownRenderer}
            />
        );
    }

    function handleItemSelection() {
        console.log("selected");
    }

    function countdownRenderer({hours, minutes, seconds, completed}) {
        function handleHours(hours) {
            if (hours === 1) {
                return (hours + " hour")
            }
            return (hours + " hours");
        }
        function handleMinutes(minutes) {
            if (minutes < 10) {
                return ("0" + minutes);
            }
            return (minutes);
        }
        function handleSeconds(seconds) {
            if (seconds < 10) {
                return ("0" + seconds);
            }
            return (seconds);
        }

        if (completed) {
            return (
                <span className="text-danger">Expired</span>
            );
        }
        if (hours < 1) {
            return (
                <span className="text-danger">
                    {handleMinutes(minutes)}:{handleSeconds(seconds)}
                </span>
            );
        }
        return (
            <span>{handleHours(hours)}</span>
        );
    }

    return (
        <div>
            <div>

            </div>

            <div className={"d-flex flex-wrap gap-4 m-5"}>
                { (itemList.length > 0) ?
                    itemList.map((item) => {
                        return (
                            <button
                            key={item["id"]}
                            className="btn btn-dark rounded-3 p-4 m-4 text-white"
                            onClick={handleItemSelection}
                            >
                                <img
                                // src="../../public/logo192.png"
                                alt=""
                                className="col-2 mb-2"
                                style={{height: "200px", width: "200px"}}
                                />
                                <div className="d-flex flex-column gap-2">
                                    <div className="fs-5">
                                        {item["name"]}
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mx-4">
                                        <div className="fs-5">
                                            {item["currentPrice"] + "$"}
                                        </div>

                                        <div>
                                            Bids: {item["numberOfBids"]}
                                        </div>
                                    </div>
                                    <div className="fs-5">
                                        Ends in {handleTimeDifferenceFromNow(item["ends"])}
                                    </div>
                                </div>
                            </button>
                        );
                    })
                    :
                    null
                }
            </div>
            { errorMessage ? <ErrorPopup errorMessage={errorMessage} /> : null }
        </div>
    );
}

export default ActiveItems;