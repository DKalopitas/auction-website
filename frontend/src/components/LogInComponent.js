import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import axios from '../api/axios';

const LOGIN_URL = '/auth/token';

const LogInComponent = () => {
    const { setAuth } = useAuth();
    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(jwt(response?.data)?.scope);
            const accessToken = response?.data;
            const roles = jwt(response?.data)?.scope;
            setAuth({ username, password, roles, accessToken });
            setUsername('');
            setPassword('');
            setSuccess(true);
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                setErrorMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrorMsg('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrorMsg('Invalid Username or Password');
            } else {
                setErrorMsg('Login Failed');
            }
            errorRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link to="/">Go to Homepage</Link>
                    </p>
                </section>
            ) : (
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50 mb-5">Please enter your username and password!</p>
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label" htmlFor="username">Username</label>
                                        <input type="text"
                                            id="username"
                                            ref={usernameRef}
                                            autoComplete="off"
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                            required 
                                            className="form-control form-control-lg"
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        <input type="password" 
                                            id="typePasswordX"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                            className="form-control form-control-lg"
                                        />
                                    </div>

                                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                </form>

                                <div ref={errorRef} 
                                className={errorMsg ? "errmsg" : "offscreen"}
                                aria-live="assertive"
                                style={{color: "red", marginTop: "4rem"}}
                                >
                                    {errorMsg}
                                </div>
                                </div>

                                <div>
                                <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                                </p>
                                </div>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default LogInComponent;