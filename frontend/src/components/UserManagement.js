import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function UserManagement() {

    const { pathname } = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [request, setRequest] = useState(user);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async() => {
            try {
                const response = await axiosPrivate.get(`users/${pathname.substring(7)}`, {});
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
    }, [user]);

    const handleActivation = () => {
        setUser({...user, enabled: !user.enabled});
    }

    const handleSave = () => {
        try {
            axiosPrivate.put(`users/${user.id}`, request);
        } catch(error) {
            console.error(error);
        }
    }

    const handleDelete = () => {
        try {
            axiosPrivate.delete(`users/${user.id}`, {})
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
                        <div className="row z-depth-3">
                            <div className="col-sm-4 bg-dark rounded-start d-flex flex-column justify-content-center text-white text-center">
                                <i className="fas fa-user fa-9x text-secondary mt-5"></i>
                                <h2 className="font-weight-bold mt-3">{user?.username}</h2>
                                {
                                    (() => {
                                        if (user?.userRole === "ADMIN") {
                                            return (null);
                                        } 
                                        return (
                                            <React.Fragment>
                                                <button 
                                                type="button"
                                                className="btn btn-dark p-3 mt-3 mx-auto"
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
                            <div className="col-sm-8 bg-dark rounded-end text-white pb-3">
                                <h3 className="mt-3 text-center">Info</h3>
                                <hr className="text-info mt-0 w-25 mx-auto"></hr>
                                <div className="row">
                                    {
                                        Object.keys(user).map(key => {
                                            if (key === "authorities") {
                                                return (
                                                    <div key={key} className="col-sm-4 my-3">
                                                        <p className="font-weight-bold">{key}</p>
                                                        <h6 className="text-muted">{user[key][0].authority}</h6>
                                                    </div>
                                                )
                                            }
                                            if (key === "password") {
                                                return (null);
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
                                    <button 
                                    type="button" 
                                    className="btn btn-success col-sm-2 my-3 mx-auto"
                                    onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                    <button
                                    type="button"
                                    className="btn btn-dark col-sm-2 p-2 me-4"
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
            {/* <div 
            className="modal fade" 
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
                        <div className="modal-body text-center">
                            <form onSubmit={handleSubmit(handleSave)}>
                                {
                                    Object.keys(request).map( key => {
                                        if (key === 'id' 
                                                || key === 'password' 
                                                || typeof(request[key]) === 'boolean'
                                            ) {
                                            return (null);
                                        }
                                        if (key === 'userRole') {
                                            return (
                                                <div key={key} className="">
                                                    <p className="font-weight-bold mb-1">{key}</p>
                                                    <select 
                                                    className="mb-3"
                                                    {...register(key)}
                                                    defaultValue={request[key]}
                                                    >
                                                        <option value="ADMIN">ADMIN</option>
                                                        <option value="USER">USER</option>
                                                    </select>
                                                    <div className="text-danger">{}</div>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div key={key} className="">
                                                <p className="font-weight-bold mb-1">{key}</p>
                                                <input 
                                                className="mb-3"
                                                {...register(key)}
                                                defaultValue={request[key]}
                                                />
                                                <div className="text-danger">{}</div>
                                            </div>
                                        )
                                    })
                                }
                                <button type="submit" className="btn btn-success">Save</button>
                            </form>
                        </div>
                        <div className="d-flex justify-content-between px-4 mx-2 my-4">
                            <button type="button" className="btn btn-secondary px-3" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-success">Save All</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default UserManagement;