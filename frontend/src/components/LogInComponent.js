import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import axios from '../api/axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/authentication';

const LogInComponent = () => {
    const usernameRef = useRef();
    const errorRef = useRef();
    const signIn = useSignIn();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

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
            // console.log(JSON.stringify(response?.data));
            const accessToken = response?.data;
            const roles = jwt(response?.data)?.scope;
            signIn({
                token: accessToken,
                expiresIn: 60,
                tokenType: 'Bearer',
                authState: { name: username, roles: roles }
            })
            setUsername('');
            setPassword('');
            navigate("/");
        } catch (error) {
            // console.log(error);
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
        <section className="mt-5">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white rounded-4">
                    <div className="card-body p-4 text-center">

                        <h2 className="fw-bold mb-5">Sign In</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline form-white mx-4 mb-4 pb-2">
                                <label className="form-label" htmlFor="username">Username</label>
                                <input
                                type="text"
                                id="username"
                                ref={usernameRef}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                                className="form-control form-control-lg"
                                />
                            </div>

                            <div className="form-outline form-white mx-4 mb-4">
                                <label className="form-label" htmlFor="typePasswordX">Password</label>
                                <input 
                                type="password" 
                                id="typePasswordX"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                className="form-control form-control-lg"
                                />
                            </div>

                            <p className="small">
                                <a className="text-white-50" 
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                                target="_blank" rel="noopener noreferrer"
                                >
                                    Forgot password?
                                </a>
                            </p>

                            <button className="btn btn-outline-light btn-lg px-5 mt-5" type="submit">Login</button>
                        </form>

                        <div ref={errorRef} 
                        className={`${errorMsg ? "errmsg" : "offscreen"} text-danger my-5`}
                        aria-live="assertive"
                        >
                            {errorMsg}
                        </div>

                        <p className="mt-0">Don't have an account?
                            <Link to="/sign-up" className="text-white-50 fw-bold ms-1">Sign Up</Link>
                        </p>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default LogInComponent;