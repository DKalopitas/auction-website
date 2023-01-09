import React, { useState, useEffect } from 'react';
// import UserService from '../services/UserService';
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function ListUserComponent() {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();

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

    return (
        <div className="text-center">
            <h2 className="mt-5">Users List</h2>
                <table className="table table-dark table-hover mt-4">
                    <thead className="bg-light">
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                user => 
                                <tr key={user.id}>
                                    <td>
                                        {user.username}
                                    </td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
        </div>
    );
}

export default ListUserComponent;