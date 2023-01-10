import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate } from 'react-router-dom';

function ListUserComponent() {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async() => {
            try {
                const response = await axiosPrivate.get('/users', {})
                // console.log(response.data);
                isMounted && setUsers(response.data);
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

    const handleActivation = () => {
        
    }

    const handleSelection = (username) => {
        navigate(`/users/${username}`, {state:{username}});
    }

    return (
        <div>
            <div className="text-center">
                <h2 className="mt-5 pt-3 text-white">Users List</h2>
                <div className="mx-5">
                    <table className="table table-dark table-hover align-middle mt-4">
                        <thead className="bg-light">
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(
                                    user => 
                                    <tr key={user.id} role="button" onClick={ () => handleSelection(user.username)}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {
                                                    user.enabled ? <span className="badge rounded-pill text-bg-success px-3 d-inline">Active</span>
                                                    : <span className="badge rounded-pill text-bg-warning d-inline">Awaiting</span>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    (() => {
                                                        if (user.username === "admin") {
                                                            return (null);
                                                        } else {
                                                            return (
                                                                <button
                                                                type="button"
                                                                className="btn btn-link btn-dark btn-rounded btn-sm fw-bold"
                                                                title={ user.enabled ? "Disable Account" : "Enable Account" }
                                                                onClick={handleActivation}
                                                                >
                                                                    { 
                                                                        user.enabled ? <i className="fa-solid fa-xmark text-danger"></i>
                                                                        : <i className="fa-solid fa-check text-success"></i>
                                                                    }
                                                                </button>
                                                            );
                                                        }
                                                    })()
                                                }
                                                
                                                {/* <button
                                                type="button"
                                                className="btn btn-link btn-dark btn-rounded btn-sm fw-bold"
                                                title="Delete Account"
                                                onClick={handleDelete}
                                                >
                                                    <i className="fa-solid fa-trash text-danger"></i>
                                                </button> */}
                                            </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListUserComponent;