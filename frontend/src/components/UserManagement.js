import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function UserManagement() {

    const { state } = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState({});

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async() => {
            try {
                const response = await axiosPrivate.get(`users/${state.username}`, {})
                // console.log(response.data);
                isMounted && setUser(response.data)
            } catch(error) {
                console.error(error);
            }
        }
        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate, state.username]);

    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10 mt-5 pt-5">
                        <div className="row z-depth-3">
                            <div className="col-sm-4 bg-dark rounded-start">
                                <div className="card-block text-center text-white mt-4">
                                    <i className="fas fa-user fa-9x mt-5 text-secondary"></i>
                                    <h2 className="font-weight-bold mt-3">{user?.username}</h2>
                                    <div className="mt-5">
                                        <button
                                        type="button"
                                        className="btn btn-dark mt-4 mb-4 p-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        title="Edit"
                                        >
                                            <i className="far fa-edit fa-2x text-info"></i>
                                        </button>
                                        {
                                            (() => {
                                                if (user?.userRole === "ADMIN") {
                                                    return (null);
                                                } else {
                                                    return (
                                                        <React.Fragment>
                                                            <button 
                                                            type="button"
                                                            className="btn btn-dark mt-4 mb-4 p-2"
                                                            title={ user.enabled ? "Disable Account" : "Enable Account" }
                                                            >
                                                                { 
                                                                    user.enabled ? <i className="fa-solid fa-xmark fa-2x text-danger"></i>
                                                                    : <i className="fa-solid fa-check fa-2x text-success"></i>
                                                                }
                                                            </button>
                                                            <br></br>
                                                            <button
                                                            type="button"
                                                            className="btn btn-dark mt-4 mb-2 p-2"
                                                            title="Delete Account"
                                                            >
                                                                <i className="fa-solid fa-trash fa-2x text-danger"></i>
                                                            </button>
                                                        </React.Fragment>
                                                    );
                                                }
                                            })()
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8 bg-dark rounded-end text-white">
                                <h3 className="mt-3 text-center">Info</h3>
                                <hr className="text-info mt-0 w-25 mx-auto"></hr>
                                <div className="row">
                                    {
                                        Object.keys(user).map( key => {
                                            if (key === "authorities") {
                                                return (
                                                    <div key={key} className="col-sm-4 my-3">
                                                        <p className="font-weight-bold">{key}</p>
                                                        <h6 className="text-muted">{user[key][0].authority}</h6>
                                                    </div>
                                                )
                                            }
                                            if (key === "password") {
                                                return (
                                                    null
                                                )
                                            }
                                            if (user[key] === "") {
                                                return (
                                                <div key={key} className="col-sm-4 my-3">
                                                    <p className="font-weight-bold">{key}</p>
                                                    <h6 className="text-muted">-</h6>
                                                </div>
                                                )
                                            }
                                            return (
                                                <div key={key} className="col-sm-4 my-3">
                                                    <p className="font-weight-bold">{key}</p>
                                                    <h6 className="text-muted">{String(user[key])}</h6>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserManagement;