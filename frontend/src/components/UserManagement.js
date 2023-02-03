import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function UserManagement() {

    const { pathname } = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        taxIdNumber: "",
        username: "",
        enabled: "",
        userRole: []
    });
    const labels = {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phoneNumber: "Phone Number",
        address: "Address",
        taxIdNumber: "Tax ID",
        username: "Username",
        enabled: "Account Status",
        userRole: "User Roles"
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async() => {
            try {
                const response = await axiosPrivate.get(`users/${pathname.substring(7)}`);
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

    const handleActivation = async() => {
        try {
            await axiosPrivate.put(`users/${user.id}`, {...user, enabled: !user.enabled})
            setUser({...user, enabled: !user.enabled});
        } catch(error) {
            console.error(error);
        }
    }

    const handleDelete = async() => {
        try {
            await axiosPrivate.delete(`users/${user.id}`, {})
            navigate("/users")
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10 mt-5 pt-5">
                        <div className="row z-depth-3 bg-dark">
                            <div className="col-sm-4 rounded-start d-flex flex-column justify-content-center text-center text-white">
                                <i className="fas fa-user fa-9x text-secondary mt-5"></i>
                                <h2 className="font-weight-bold mt-3">{user?.username}</h2>
                                {
                                    (() => {
                                        if (user.userRole[0] === "ADMIN") {
                                            return (null);
                                        }
                                        return (
                                            <React.Fragment>
                                                <button 
                                                type="button"
                                                className="btn btn-dark p-2 mt-4 mx-auto"
                                                title={ user.enabled ? "Disable Account" : "Enable Account" }
                                                onClick={handleActivation}
                                                >
                                                    { 
                                                        user.enabled ? <i className="fa-solid fa-xmark fa-2x text-danger"></i>
                                                        : <i className="fa-solid fa-check fa-2x text-success"></i>
                                                    }
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
                                        Object.keys(user).map(key => {
                                            if (key === "id") {
                                                return (null);
                                            }
                                            if (key === "authorities") {
                                                return (
                                                    <div key={key} className="col-sm-4 my-3">
                                                        <p className="font-weight-bold">{labels[key]}</p>
                                                        <h6 className="text-muted">{user[key][0].authority}</h6>
                                                    </div>
                                                )
                                            }
                                            if (key === "enabled") {
                                                return (
                                                    <div key={key} className="col-sm-4 my-3">
                                                        <p className="font-weight-bold">{labels[key]}</p>
                                                        <h6 className="text-muted">{user[key] ? "Enabled" : "Disabled"}</h6>
                                                    </div>
                                                )
                                            }
                                            return (
                                                <div key={key} className="col-sm-4 my-3">
                                                    <p className="font-weight-bold">{labels[key]}</p>
                                                    <h6 className="text-muted">{String(user[key])}</h6>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="col-sm-2 ms-auto">
                                        <button
                                        type="button"
                                        className="btn btn-dark p-2 mx-auto"
                                        title="Delete Account"
                                        onClick={handleDelete}
                                        >
                                            <i className="fa-solid fa-trash fa-2x text-danger"></i>
                                        </button>
                                    </div>
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