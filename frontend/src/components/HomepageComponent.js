import React from "react";
import { Link } from "react-router-dom"

function HomepageComponent() {

    return(
        <div className="container">
            <h1>Homepage</h1>
            <Link to="/sign-up" className='btn btn-primary'>Sign Up</Link>
        </div>
    );
}

export default HomepageComponent;