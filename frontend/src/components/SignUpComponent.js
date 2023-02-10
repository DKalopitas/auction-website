import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../api/axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import ErrorPopup from './ErrorPopup';

const REGISTER_URL = '/registration';
const userForm = z.object({
    firstName: z.string()
        .min(1, { message: "First Name is required" })
        .min(3, { message: "First Name must contain at least 3 characters" })
        .max(16, { message: "First Name must contain at most 16 characters" }),
    lastName: z.string()
        .min(1, { message: "Last Name is required" })
        .min(3, { message: "Last Name must contain at least 3 characters" })
        .max(16, { message: "Last Name must contain at most 16 characters" }),
    email: z.string().email()
        .min(1, { message: "Email is required" }),
    phoneNumber: z.string()
        .min(1, { message: "Phone Number is required" })
        .regex(/^[0-9]*$/, { message: "Phone Number must only contain digits" })
        .length(10, { message: "Phone Number must contain 10 digits" }),
    address: z.string()
        .min(1, { message: "Address is required" })
        .regex(/[A-Za-z]{3,16}\s?[A-Za-z]{0,16},?\s?[0-9]{1,3}/, { message: "Invalid Address" }),
    taxIdNumber: z.string()
        .min(1, { message: "Tax ID is required" })
        .regex(/^[0-9]*$/, { message: "Tax ID must only contain digits" })
        .length(9, { message: "Tax ID must contain 9 digits" }),
    username: z.string()
        .min(1, { message: "Username is required" })
        .min(3, { message: "Username must contain at least 3 characters" })
        .max(16, { message: "Username must contain at most 16 characters" })
        .regex(/^([A-Za-z0-9]_?)*$/, { message: "Invalid Username" }),
    password: z.string()
    .min(1, { message: "Password is required" })
    .min(10, { message: "Password must contain at least 10 characters" })
    .max(24, { message: "Password must contain at most 24 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]*$/, {
    message: "Password must contain at least 1 lower case, 1 upper case, 1 number & 1 special character" 
    })
});

function SignUpComponent() {

    // const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const labels = {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phoneNumber: "Phone Number",
        address: "Str. Address",
        taxIdNumber: "Tax ID",
        username: "Username",
        password: "Password"
    };
    const { register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({ 
        resolver: zodResolver(userForm), 
        mode: "onTouched", 
    });
    
    const handleSubmitRequest = async(formValues) => {
        try {
            setLoading(true);
            await axios.post(REGISTER_URL, formValues,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // navigate("/sign-up-success");
            setShow(true);
        } catch (err) {
            // console.log(err?.response?.status);
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 409) {
                setErrorMessage('Username is already taken');
            } else {
                setErrorMessage('Registration Failed')
            }
        }
        setLoading(false);
    };
    
    return (
        <section className="mt-4">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card bg-dark text-white rounded-4">
                                <div className="card-body text-center p-5">
                                    <h2 className="text-uppercase mb-5">Create account</h2>
                                    <form onSubmit={handleSubmit(handleSubmitRequest)}>
                                        <div className="row text-center">
                                            {
                                                Object.keys(labels).map(key => {
                                                    return (
                                                        <div key={key} className="col-sm-6 mb-4 pb-2">
                                                            <FloatingLabel className="text-black" label={labels[key]}>
                                                                <Form.Control 
                                                                placeholder="-"
                                                                type={ (key === "password") ? "password" : "text" }
                                                                { ...register(key) }
                                                                />
                                                            </FloatingLabel>
                                                            <div className="text-danger mt-1 mx-1">{errors[key]?.message}</div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                        <div className="text-center">
                                            <button
                                            className="btn btn-outline-light btn-lg px-5 mt-3"
                                            type="submit"
                                            onClick={ () => setErrorMessage("") }
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </form>
                                    { 
                                        loading ?
                                            <div className="spinner-border mt-5" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        : null
                                    }
                                    <p className="text-muted mt-5 mb-0">Already have an account? 
                                        <Link to="/log-in" className="text-white-50 fw-bold ms-1">
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                errorMessage ? <ErrorPopup errorMessage={errorMessage} /> : null
            }

            <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            centered
            // style={{background: "#212529"}}
            >
                <Modal.Body className="bg-dark text-white text-center rounded-3">
                <div className="mt-md-4 pb-2">
                    <h2 className="fw-bold mb-5">Success</h2>
                    <div className="fs-5 mb-5">
                        <div className="mb-3">Your request has been submitted.</div>
                        <div>We will check your details and enable your account 
                            as soon as possible!</div>
                    </div>
                    <Link 
                    to="/" 
                    className="text-white fw-bold fs-5" 
                    onClick={ () => setShow(false) }
                    >
                        Go to Homepage
                    </Link>
                    </div>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default SignUpComponent;