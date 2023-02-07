import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';

const updateUserForm = z.object({
    id: z.number(),
    enabled: z.boolean(),
    userRole: z.string().array(),
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
        .regex(/^([A-Za-z0-9]_?)*$/, { message: "Invalid Username" })
});

const updatePasswordForm = z
    .object({
        newPassword: z.string()
            .min(1, { message: "Password is required" })
            .min(10, { message: "Password must contain at least 10 characters" })
            .max(24, { message: "Password must contain at most 24 characters" })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]*$/, {
            message: "Password must contain at least 1 lower case, 1 upper case, 1 number & 1 special character" 
            }),
        confirmPassword: z.string()
            .min(1, { message: "Confirm Password is required" })
    })
    .refine((data) => data.newPassword === data.confirmPassword, { 
        message: "Passwords don't match",
        path: ["confirmPassword"]
    });

function UserProfile() {

    const { pathname } = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const signOut = useSignOut();
    const [user, setUser] = useState({});
    const [request, setRequest] = useState({});
    const labels = {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phoneNumber: "Phone Number",
        address: "Address",
        taxIdNumber: "Tax ID",
        username: "Username",
        enabled: "Account Status"
    };
    const { register, 
        handleSubmit, 
        setValue, 
        reset,
        formState: { errors } 
    } = useForm({ 
        resolver: zodResolver(updateUserForm), 
        mode: "onTouched", 
        defaultValues: request,
        values: request
    });
    const { register: registerPwd, 
        handleSubmit: handleSubmitPwd, 
        reset: resetPwd, 
        formState: { errors: errorsPwd } 
    } = useForm({ 
        resolver: zodResolver(updatePasswordForm), 
        mode: "onTouched"
    });

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async() => {
            try {
                const response = await axiosPrivate.get(pathname)
                // console.log(response.data);
                isMounted && setUser(response.data);
            } catch(error) {
                console.error(error);
            }
        }
        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate, pathname]);

    useEffect(() => {
        setRequest(user);
    }, [user])

    const handleEdit = (formValues) => {
        try {
            axiosPrivate.put(String(user.id), formValues);
            navigate(0);
        } catch(error) {
            console.error(error);
        }
    }

    const handlePassword = (formValues) => {
        try {
            axiosPrivate.put(`${String(user.id)}/reset-password`, null, {params: {newPassword: formValues["newPassword"]}});
            navigate(0);
        } catch(error) {
            console.error(error);
        }
    }

    const handleDelete = () => {
        try {
            axiosPrivate.delete(String(user.id), {})
        } catch(error) {
            console.error(error);
        }
        signOut();
        navigate("/");
    }

    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-9 mt-5 pt-5">
                        <div className="row z-depth-3 bg-dark">
                            <div className="col-sm-4 rounded-start d-flex flex-column justify-content-between align-items-center text-white pt-5">
                                <i className="fas fa-user fa-9x mt-5 text-secondary"></i>
                                <h2 className="font-weight-bold mt-3">{user.username}</h2>
                                <button
                                type="button"
                                className="btn btn-dark mt-4"
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                                title="Edit"
                                >
                                    <i className="far fa-edit fa-2x text-info"></i>
                                </button>
                                {
                                    (() => {
                                        if (user["userRole"] === "ADMIN") {
                                            return (null);
                                        } 
                                        return (
                                            <React.Fragment>
                                                <button
                                                type="button"
                                                className="btn btn-dark mt-auto mb-5"
                                                title="Delete Account"
                                                onClick={handleDelete}
                                                >
                                                    <i className="fa-solid fa-trash fa-2x text-danger"></i>
                                                </button>
                                            </React.Fragment>
                                        );
                                    })()
                                }
                            </div>
                            <div className="col-sm-8 rounded-end text-white pb-3">
                                <h3 className="mt-3 text-center">Info</h3>
                                <hr className="text-info mt-0 w-25 mx-auto"></hr>
                                <div className="row">
                                    {
                                        Object.keys(user).map(keyName => {
                                            if (keyName === "id"
                                            || keyName === "userRole"
                                            ) {
                                                return (null);
                                            }
                                            if (keyName === "enabled") {
                                                return (
                                                    <div key={keyName} className="col-sm-6 my-3">
                                                        <p className="font-weight-bold">{labels[keyName]}</p>
                                                        <h6 className="text-muted">
                                                            {
                                                                user[keyName] ? "Enabled"
                                                                : "Disabled"
                                                            }
                                                        </h6>
                                                    </div>
                                                )
                                            }
                                            return (
                                                <div key={keyName} className="col-sm-6 my-3">
                                                    <p className="font-weight-bold">{labels[keyName]}</p>
                                                    <h6 className="text-muted">{user[keyName]}</h6>
                                                </div>
                                            );
                                        })
                                    }
                                    <div className="col-sm-6 my-3 ms-5 text-center">
                                        <p className="font-weight-bold">Password</p>
                                        <button 
                                        type="button" 
                                        className="btn btn-info"
                                        data-bs-toggle="modal"
                                        data-bs-target="#passwordModal"
                                        >
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" 
            id="editModal" 
            data-bs-backdrop="static"
            data-bs-keyboard="false" 
            tabIndex="-1" 
            aria-labelledby="staticBackdropLabel" 
            aria-hidden="true"
            >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white rounded-3">
                <div className="text-center m-2">
                    <h1 className="modal-title fs-3" id="staticBackdropLabel">Edit</h1>
                    <hr className="text-info mt-1 w-25 mx-auto"></hr>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit(handleEdit)}>
                        <div className="row text-center px-4">
                        {
                            Object.keys(user).map(key => {
                                if (key === "id"
                                || key === "enabled"
                                || key === "userRole"
                                ) {
                                    setValue(key, user[key]);
                                    return (null);
                                }
                                return (
                                    <div key={key} className="col-sm-6 mb-4 pb-2 mx-auto">
                                        <FloatingLabel className="text-black" label={labels[key]}>
                                            <Form.Control 
                                            placeholder="-"
                                            { ...register(key) }
                                            />
                                        </FloatingLabel>
                                        <div className="text-danger mt-1 mx-1">{errors[key]?.message}</div>
                                    </div>
                                );
                            })
                        }
                        </div>
                        <div className="d-flex justify-content-between mt-5 mb-3 mx-3">
                            <button 
                            type="button" 
                            className="btn btn-secondary px-3" 
                            data-bs-dismiss="modal" 
                            onClick={ () => { reset() } }
                            >
                                Cancel
                            </button>
                            <button 
                            type="submit" 
                            className="btn btn-success px-3" 
                            >
                                Save All
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>

            </div>
            <div className="modal fade" 
            id="passwordModal" 
            data-bs-backdrop="static"
            data-bs-keyboard="false" 
            tabIndex="-1" 
            aria-labelledby="staticBackdropLabel" 
            aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white rounded-3">
                    <div className="text-center m-2">
                        <h1 className="modal-title fs-3" id="staticBackdropLabel">Reset Password</h1>
                        <hr className="text-info mt-1 w-25 mx-auto"></hr>
                    </div>
                    <div className="modal-body text-center">
                        <p className="mb-5">Changing your password will result in log out.</p>
                        <form onSubmit={handleSubmitPwd(handlePassword)}>
                            <div className="col-sm-6 mb-4 pb-2 mx-auto">
                                <FloatingLabel className="text-black" label="New Password">
                                    <Form.Control 
                                    type="text"
                                    placeholder="-"
                                    { ...registerPwd("newPassword") }
                                    />
                                </FloatingLabel>
                                <div className="text-danger mt-1">{errorsPwd["newPassword"]?.message}</div>
                            </div>
                            <div className="col-sm-6 mb-4 pb-2 mx-auto">
                                <FloatingLabel className="text-black" label="Confirm Password">
                                    <Form.Control
                                    type="text"
                                    placeholder="-"
                                    { ...registerPwd("confirmPassword") }
                                    />
                                </FloatingLabel>
                                <div className="text-danger mt-1">{errorsPwd["confirmPassword"]?.message}</div>
                            </div>
                            <div className="d-flex justify-content-between mt-5 pt-4 mb-4 mx-4">
                                <button 
                                type="button" 
                                className="btn btn-secondary px-3" 
                                data-bs-dismiss="modal"
                                onClick={ () => { resetPwd() } }
                                >
                                    Cancel
                                </button>
                                <button 
                                type="submit" 
                                className="btn btn-success px-3" 
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;