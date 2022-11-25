import React, { Component } from 'react';

class ListUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    render() {
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
                                this.state.users.map(
                                    user=>
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
}

export default ListUserComponent;