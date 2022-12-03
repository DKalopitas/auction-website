import React from "react";
import { Link } from "react-router-dom";

export default function NavbarComponent() {

    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid px-5">
                <Link to="/" className="navbar-brand">Home</Link>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav nav-pills mr-auto" style={{fontSize: 18}}>
                        <li className="nav-item"><Link to="/users" className="nav-link">Users</Link></li>
                        <li className="nav-item"><Link to="/sign-up" className="nav-link">Sign Up</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
