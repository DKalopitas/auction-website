import React from "react";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from 'react-auth-kit';
import { useAuthUser } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";

export default function NavbarComponent() {
    const auth = useAuthUser();
    const signOut = useSignOut();
    const isAuthenticated = useIsAuthenticated();

    function handleLogOut() {
        signOut();
    }

    function logInController() {
        // console.log(authent().roles);
        if (isAuthenticated()) {
            if (auth().roles === 'USER') {
                return(
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={handleLogOut}>
                            Log Out
                        </Link>
                    </li>
                )
            }
            if (auth().roles === 'ADMIN') {
                return(
                    <React.Fragment>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">
                                Users
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={handleLogOut}>
                                Log Out
                            </Link>
                        </li>
                    </React.Fragment>
                )
            }
        }
        return(
            <React.Fragment>
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
                    <ul 
                    className="navbar-nav"
                    style={{fontSize: 18}}
                    >
                        {logInController()}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
