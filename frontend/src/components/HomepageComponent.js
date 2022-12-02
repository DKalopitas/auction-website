import React from "react";
import { useNavigate } from "react-router-dom";

function HomepageComponent() {
    const navigate = useNavigate();

    return(
        <div className="container">
            <h1>Homepage</h1>
            <button className='btn btn-primary' onClick={() => {navigate("/sign-up")}}>Sign Up</button>
        </div>
    );
}

export default HomepageComponent;