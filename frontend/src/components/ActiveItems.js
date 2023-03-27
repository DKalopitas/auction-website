import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import ErrorPopup from './ErrorPopup'
import TimeDifference from './TimeDifference';

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

    function handleItemSelection(itemId) {
        navigate(`${itemId}`, { state: {itemId: itemId} });
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
                            onClick={() => handleItemSelection(item["id"])}
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
                                    <div className="fs-5 d-flex justify-content-center gap-1">
                                        Ends in
                                        <TimeDifference date={item["ends"]} />
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