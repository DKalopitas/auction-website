import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomepageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <Link to='/sign-up'>
                    <button className='btn btn-primary'>Sign Up</button>
                </Link>
            </div>
        );
    }
}

export default HomepageComponent;