import React from "react";
import { Link } from "react-router-dom";

export default function NavbarComponent() {

    return(
        
        <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid px-5">
                <Link to="/" className="navbar-brand mb-0 h1">Home</Link>
                <button 
                type="button"
                className="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav"
                     style={{fontSize: 18}}>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">
                                Users
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sign-up" className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
