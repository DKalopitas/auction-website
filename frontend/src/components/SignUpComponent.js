import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import FormInput from './FormInput';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const REGISTER_URL = '/registration';

function SignUpComponent() {

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        taxIdNumber: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    
    const inputs = [
        {
            id: 1,
            name: "firstName",
            type: "text",
            placeholder: "First Name",
            errorMessage:
                "First name should be 3-16 characters and shouldn't include any special character",
            label: "First Name",
            pattern: "^[A-Za-z]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "lastName",
            type: "text",
            placeholder: "Last Name",
            errorMessage:
                "Last name should be 3-16 characters and shouldn't include any special character",
            label: "Last Name",
            pattern: "^[A-Za-z]{3,16}$",
            required: true,
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address",
            label: "Email",
            pattern: "^(.+)@(.+)$",
            required: true,
        },
        {
            id: 4,
            name: "phoneNumber",
            type: "tel",
            placeholder: "Phone Number",
            errorMessage:
                "Phone number should be 10 digits",
            label: "Phone Number",
            pattern: "^[0-9]{10}$",
            required: true,
        },
        {
            id: 5,
            name: "address",
            type: "text",
            placeholder: "Str. Address",
            errorMessage:
                "It should be a valid street address",
            label: "Str. Address",
            pattern: "^[A-Za-z,\\s+0-9]{3,16}$",
            required: true,
        },
        {
            id: 6,
            name: "taxIdNumber",
            type: "text",
            placeholder: "Tax ID",
            errorMessage:
                "Tax ID should be 9 digits",
            label: "Tax ID",
            pattern: "^[0-9]{9}$",
            required: true,
        },
        {
            id: 7,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage:
                "Username should be 3-16 characters and shouldn't include any special character",
            label: "Username",
            pattern: "^[A-Za-z0-9-_]{3,16}$",
            required: true,
        },
        {
            id: 8,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 9,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords don't match",
            label: "Confirm Password",
            pattern: values.password,
            required: true,
        },
    ];
    
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        setValidated(true);

        if (form.checkValidity() === true) {
            try {
                const response = await axios.post(REGISTER_URL,
                    JSON.stringify(values),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                console.log(response?.data);
                if (response?.data === "User Signed Up") {
                    navigate("/");
                }
            } catch (err) {
                console.log(err);
                // if (!err?.response) {
                //     setErrMsg('No Server Response');
                // } else if (err.response?.status === 409) {
                //     setErrMsg('Username Taken');
                // } else {
                //     setErrMsg('Registration Failed')
                // }
                // errRef.current.focus();
            }
        }
    };
    
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    
    return (
        <section className="vh-100">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                        <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                        <Form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate validated={validated}>
                            {inputs.map((input) => (
                                <FormInput
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={handleChange}
                                />
                            ))}

                            <div className="d-flex justify-content-center">
                            <Button type="submit"
                                className="btn btn-outline-light btn-lg px-5">Sign Up</Button>
                            </div>

                            <p className="text-center text-muted mt-5 mb-0">Already have an account? 
                                <Link to="/log-in" className="text-white-50 fw-bold ms-1">
                                    Login
                                </Link>
                            </p>
                        </Form>

                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}

export default SignUpComponent;