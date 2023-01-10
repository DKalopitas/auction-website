import React, { useState } from 'react';
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function UserProfile() {

    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        taxIdNumber: "",
        username: ""
    });

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async() => {
            try {
                const response = await axiosPrivate.get('/profile', {})
                // console.log(response.data);
                isMounted && setUser({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber,
                    address: response.data.address,
                    taxIdNumber: response.data.taxIdNumber,
                    username: response.data.username
                })
            } catch(error) {
                console.error(error);
            }
        }
        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate]);

    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10 mt-5 pt-5">
                        <div className="row z-depth-3">
                            <div className="col-sm-4 bg-dark rounded-start">
                                <div className="card-block text-center text-white">
                                    <i className="fas fa-user fa-9x mt-5 text-secondary"></i>
                                    <h2 className="font-weight-bold mt-3">{user?.username}</h2>
                                    <button
                                    type="button"
                                    className="btn btn-dark mt-4 mb-4 p-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    >
                                        <i className="far fa-edit fa-2x text-info"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-sm-8 bg-dark rounded-end text-white">
                                <h3 className="mt-3 text-center">Info</h3>
                                <hr className="text-info mt-0 w-25 mx-auto"></hr>
                                <div className="row">
                                    <div className="col-sm-6 my-3">
                                        <p className="font-weight-bold">First Name</p>
                                        <h6 className="text-muted">{user.firstName}</h6>
                                    </div>
                                    <div className="col-sm-6 my-3">
                                        <p className="font-weight-bold">Last Name</p>
                                        <h6 className="text-muted">{user.lastName}</h6>
                                    </div>
                                    <div className="col-sm-6 my-3">
                                        <p className="font-weight-bold">Email</p>
                                        <h6 className="text-muted">{user.email}</h6>
                                    </div>
                                    <div className="col-sm-6 my-3">
                                        <p className="font-weight-bold">Phone Number</p>
                                        <h6 className="text-muted">{user.phoneNumber}</h6>
                                    </div>
                                    <div className="col-sm-6 my-3">
                                        <p className="font-weight-bold">Address</p>
                                        <h6 className="text-muted">{user.address}</h6>
                                    </div>
                                    <div className="col-sm-6 my-3">
                                        <p className="font-weight-bold">Tax ID</p>
                                        <h6 className="text-muted">{user.taxIdNumber}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" 
            id="staticBackdrop" 
            data-bs-backdrop="static" 
            data-bs-keyboard="false" 
            tabIndex="-1" 
            aria-labelledby="staticBackdropLabel" 
            aria-hidden="true"
            >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white rounded-3">
                <div className="text-center m-2">
                    <h1 className="modal-title fs-3" id="staticBackdropLabel">Edit</h1>
                    <hr className="text-info mt-1 w-25 mx-auto"></hr>
                </div>
                <div className="modal-body ms-5 ps-4 row">
                    <div className="col-sm-6 my-3">
                        <p className="font-weight-bold">First Name</p>
                        <h6 className="text-muted">{user.firstName}</h6>
                    </div>
                    <div className="col-sm-6 my-3">
                        <p className="font-weight-bold">Last Name</p>
                        <h6 className="text-muted">{user.lastName}</h6>
                    </div>
                    <div className="col-sm-6 my-3">
                        <p className="font-weight-bold">Email</p>
                        <h6 className="text-muted">{user.email}</h6>
                    </div>
                    <div className="col-sm-6 my-3">
                        <p className="font-weight-bold">Phone Number</p>
                        <h6 className="text-muted">{user.phoneNumber}</h6>
                    </div>
                    <div className="col-sm-6 my-3">
                        <p className="font-weight-bold">Address</p>
                        <h6 className="text-muted">{user.address}</h6>
                    </div>
                    <div className="col-sm-6 my-3">
                        <p className="font-weight-bold">Tax ID</p>
                        <h6 className="text-muted">{user.taxIdNumber}</h6>
                    </div>
                </div>
                <div className="d-flex justify-content-between px-4 mx-2 my-4">
                    <button type="button" className="btn btn-secondary px-3" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-success">Save All</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default UserProfile;