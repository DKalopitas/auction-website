import React from "react";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from 'react-auth-kit';
import { useAuthUser } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent() {
    const auth = useAuthUser();
    const signOut = useSignOut();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    function handleLogOut() {
        signOut();
        navigate("/");
    }

    function logInController() {
        if (isAuthenticated()) {
            if (auth().roles === 'USER') {
                return(
                    <React.Fragment>
                        <ul 
                        className="navbar-nav me-auto fs-5"
                        >
                        </ul>
                        <ul className="navbar-nav fs-5 align-items-center">
                            <li className="nav-item dropdown">
                                <button className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center show" data-bs-toggle="dropdown">
                                    <i className="fas fa-user"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end text-center">
                                    <li>
                                        <Link to="/profile" className="dropdown-item">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item" onClick={handleLogOut}>
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </React.Fragment>
                )
            }
            if (auth().roles === 'ADMIN') {
                return(
                    <React.Fragment>
                        <ul 
                        className="navbar-nav me-auto fs-5"
                        >
                            <li className="nav-item">
                                <Link to="/users" className="nav-link">
                                    Users
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav fs-5 align-items-center">
                            <li className="nav-item dropdown">
                                <button className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center show" data-bs-toggle="dropdown">
                                    <i className="fas fa-user"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end text-center">
                                    <li>
                                        <Link to="/profile" className="dropdown-item">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item" onClick={handleLogOut}>
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </React.Fragment>
                )
            }
        }
        return(
            <React.Fragment>
                <ul 
                className="navbar-nav me-auto fs-5"
                >
                    <li className="nav-item">
                        <Link to="/log-in" className="nav-link">
                            Log In
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sign-up" className="nav-link">
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </React.Fragment>
        )
    }

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
                aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {logInController()}
                </div>
            </div>
        </nav>
    );
}
