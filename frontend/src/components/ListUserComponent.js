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
        <div>
            <h2 className='text-center'>Users List</h2>
            <div className='row'>
                <table className='table table-striped table-border'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                user => 
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListUserComponent;