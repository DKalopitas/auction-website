import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function UserProfile() {

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const signOut = useSignOut();
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState({});
    const [request, setRequest] = useState({});
    const labels = {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phoneNumber: "Phone Number",
        address: "Address",
        taxIdNumber: "Tax ID",
        username: "Username",
        enabled: "Account Enabled"
    }
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async() => {
            try {
                const response = await axiosPrivate.get(pathname, {})
                // console.log(response.data);
                isMounted && setUser(response.data);
            } catch(error) {
                console.error(error);
            }
        }
        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate, pathname]);

    useEffect(() => {
        setRequest(user);
        setRequest(current => {
            const {authorities, accountNonExpired, accountNonLocked, credentialsNonExpired, ...rest} = current;
            return rest;
        });
    }, [user])

    const handleSave = (formValues) => {
        try {
            axiosPrivate.put(String(user.id), formValues);
        } catch(error) {
            console.error(error);
        }
        if (formValues.username !== user.username) {
            signOut();
            navigate("/log-in");
            return;
        }
        navigate(0);
    }

    const handlePassword = (e) => {
        e.preventDefault();
        console.log(request);
        try {
            axiosPrivate.put(String(user.id), request);
        } catch(error) {
            console.error(error);
        }
        signOut();
        navigate("/log-in");
    }

    const handleDelete = () => {
        try {
            axiosPrivate.delete(String(user.id), {})
            signOut();
            navigate("/");
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-9 mt-5 pt-5">
                        <div className="row z-depth-3 bg-dark">
                            <div className="col-sm-4 rounded-start d-flex flex-column justify-content-between align-items-center text-white pt-5">
                                <i className="fas fa-user fa-9x mt-5 text-secondary"></i>
                                <h2 className="font-weight-bold mt-3">{user.username}</h2>
                                <button
                                type="button"
                                className="btn btn-dark mt-4"
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                                title="Edit"
                                >
                                    <i className="far fa-edit fa-2x text-info"></i>
                                </button>
                                {
                                    (() => {
                                        if (user["userRole"] === "ADMIN") {
                                            return (null);
                                        } 
                                        return (
                                            <React.Fragment>
                                                <button
                                                type="button"
                                                className="btn btn-dark mt-auto mb-5"
                                                title="Delete Account"
                                                onClick={handleDelete}
                                                >
                                                    <i className="fa-solid fa-trash fa-2x text-danger"></i>
                                                </button>
                                            </React.Fragment>
                                        );
                                    })()
                                }
                            </div>
                            <div className="col-sm-8 rounded-end text-white pb-3">
                                <h3 className="mt-3 text-center">Info</h3>
                                <hr className="text-info mt-0 w-25 mx-auto"></hr>
                                <div className="row">
                                    {
                                        Object.keys(request).map(keyName => {
                                            if (keyName === "id"
                                            || keyName === "password"
                                            || keyName === "userRole"
                                            || keyName === "locked"
                                            ) {
                                                return (null);
                                            }
                                            if (keyName === "enabled") {
                                                return (
                                                    <div key={keyName} className="col-sm-6 my-3">
                                                        <p className="font-weight-bold">{labels[keyName]}</p>
                                                        <h6 className="text-muted">
                                                            {
                                                                request[keyName] ? "Enabled"
                                                                : "Disabled"
                                                            }
                                                        </h6>
                                                    </div>
                                                )
                                            }
                                            return (
                                                <div key={keyName} className="col-sm-6 my-3">
                                                    <p className="font-weight-bold">{labels[keyName]}</p>
                                                    <h6 className="text-muted">{request[keyName]}</h6>
                                                </div>
                                            );
                                        })
                                    }
                                    <div className="col-sm-6 my-3 ms-5 text-center">
                                        <p className="font-weight-bold">Password</p>
                                        <button 
                                        type="button" 
                                        className="btn btn-info"
                                        data-bs-toggle="modal"
                                        data-bs-target="#passwordModal"
                                        >
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" 
            id="editModal" 
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
                <div className="modal-body px-5">
                    <form onSubmit={handleSubmit(handleSave)}>
                        <div className="row text-center">
                        {
                            Object.keys(request).map(key => {
                                if (key === "id"
                                || key === "password"
                                || key === "userRole"
                                || key === "locked"
                                || key === "enabled"
                                ) {
                                    setValue(key, user[key]);
                                    return (null);
                                }
                                return (
                                    <div key={key} className="col-sm-6 mb-4 pb-2 mx-auto">
                                        <p className="font-weight-bold mb-2 pb-1">{labels[key]}</p>
                                        <input 
                                        className="form-control"
                                        defaultValue={request[key]}
                                        {...register(key)}
                                        />
                                    </div>
                                );
                            })
                        }
                        </div>
                        <div className="d-flex justify-content-between mt-5 mb-4">
                            <button type="button" className="btn btn-secondary px-3" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-success px-3" data-bs-dismiss="modal">Save All</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>

            </div>
            <div className="modal fade" 
            id="passwordModal" 
            data-bs-backdrop="static"
            data-bs-keyboard="false" 
            tabIndex="-1" 
            aria-labelledby="staticBackdropLabel" 
            aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white rounded-3">
                    <div className="text-center m-2">
                        <h1 className="modal-title fs-3" id="staticBackdropLabel">Reset Password</h1>
                        <hr className="text-info mt-1 w-25 mx-auto"></hr>
                    </div>
                    <div className="modal-body text-center">
                        <p className="mb-5">Changing your password will result in log out.</p>
                        <form onSubmit={handlePassword}>
                            <div className="col-sm-6 mb-4 pb-2 mx-auto">
                                <p className="font-weight-bold mb-2 pb-1">New Password</p>
                                <input className="form-control" type="password" />
                            </div>
                            <div className="col-sm-6 mb-4 pb-2 mx-auto">
                                <p className="font-weight-bold mb-2 pb-1">Confirm Password</p>
                                <input 
                                className="form-control"
                                type="password"
                                onChange={(e) => {setRequest({...request, password: e.target.value})}}
                                />
                            </div>
                            <div className="d-flex justify-content-between mt-5 pt-4 mb-4 mx-4">
                                <button type="button" className="btn btn-secondary px-3" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-success px-3" data-bs-dismiss="modal">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;