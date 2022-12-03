import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';

function ListUserComponent() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            UserService.getUsers().then(function(response) {
                setUsers(response.data)
            });
        }
    
        fetchData();
    }, []);

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