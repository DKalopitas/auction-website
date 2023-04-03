import React, { useEffect } from 'react';
import { useState } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { DateTime } from 'luxon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { FloatingLabel, Form } from 'react-bootstrap';
import ErrorPopup from './ErrorPopup';

const REGISTER_ITEM_URL = "/my-items/new-item";

const ItemCategory = z.string()
    .min(1, { message: " " });

const ItemFormValidation = z.object({
    name: 
        z.string()
        .min(1, { message: "Name is required" })
        .min(3, { message: "Name must contain at least 3 characters" }),
    categories: 
        z.array(
            z.string()
            .min(1, { message: "Category name is required" })
        )
        .nonempty({ message: "You must include at least 1 Category" }),
    buyPrice: 
        z.number({ invalid_type_error: " " })
        .nonnegative({ message: "Price should be greater than 0" })
        .optional(),
    firstBid: 
        z.number({ invalid_type_error: "You must include First Bid price" })
        .positive({ message: "Price must be greater than 0" }),
    location: 
        z.string()
        .min(1, { message: "Location is required" }),
    country: 
        z.string()
        .min(1, { message: "Country is required" }),
    started: z.string().datetime(),
    ends: z.string().datetime(),
    description: z.string().optional()
})
.refine((data) => !data?.buyPrice || data?.buyPrice > data.firstBid, {
    message: "Buy Price must be greater than First Bid",
    path: ["buyPrice"]
});

function CreateItem() {

    const nowPlus7Days = DateTime.now().plus({ days: 7 }).toISO({ includeOffset: false });
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [categoryInput, setCategoryInput] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [categories, setCategories] = useState([]);
    const labels = {
        name: "Name",
        categories: "Categories",
        buyPrice: "Buy Price",
        firstBid: "First Bid",
        location: "Location",
        country: "Country",
        ends: "Ending Date",
        description: "Description"
    }
    const { register,
        setValue,
        getValues,
        unregister,
        handleSubmit,
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(ItemFormValidation),
        mode: "onTouched",
        defaultValues: {
            categories: [],
            ends: DateTime.fromISO(nowPlus7Days).toFormat("yyyy-LL-dd'T'HH:mm")
        }
    });

    useEffect(() => {
        setValue("categories", categories);
    }, [categories])

    useEffect(() => {
        if (errors.categories?.message) {
            setCategoryError(errors.categories?.message);
        }
    }, [errors.categories])

    function handleCategoryInputChange(e) {
        setCategoryInput(e.target.value);
        setCategoryError("");
    }

    function handleCategorySubmit() {
        try {
            ItemCategory.parse(categoryInput);
            if (!categories.includes(categoryInput)) {
                setCategories(categories => [...categories, categoryInput]);
            }
        } catch(error) {
            setCategoryError(error.issues[0].message);
        }
    }

    function removeCategory(category) {
        setCategories(categories => categories.filter(
            (cat) => cat !== category
        ));
    }

    function handleSubmitRequest(formValues) {
        console.log(formValues);
        setLoading(true);
        try {
            axiosPrivate.post(REGISTER_ITEM_URL, formValues);
        } catch (error) {
            setErrorMessage(error);
        }
        setLoading(false);
    }

    function onSubmit(e) {
        e.preventDefault();
        if (!getValues("buyPrice") > 0) {
            unregister("buyPrice");
        }
        setValue("started", new Date().toISOString());
        handleSubmit(handleSubmitRequest)();
    }

    return (
        <section className="mt-4">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-10">
                            <div className="card bg-dark text-white rounded-3">
                                <div className="card-body text-center p-5">
                                    <h2 className="text-uppercase mb-5">New Item</h2>
                                    <div className="d-flex">
                                        <div className="col-md-5 me-5 border border-1">
                                            <img
                                            // src="../../public/logo192.png"
                                            alt=""
                                            className=""
                                            style={{height: "200px", width: "200px"}}
                                            />
                                        </div>

                                        <div className="col-md">
                                            <form onSubmit={(e) => { onSubmit(e) }}>
                                                <div className="row text-center">
                                                    <div key={"name"} className="mb-4">
                                                        <FloatingLabel className="text-black" label={labels.name}>
                                                            <Form.Control 
                                                            placeholder="-"
                                                            { ...register("name") }
                                                            />
                                                        </FloatingLabel>
                                                        <div className="text-danger mt-1 mx-1">{errors.name?.message}</div>
                                                    </div>
                                                </div>

                                                <div className="row mb-4">
                                                    <div key={"categories"} className="col-sm-5 text-start me-3">
                                                        <div className="row">
                                                            <div className="col-sm">
                                                                <FloatingLabel className="text-black" label={labels.categories}>
                                                                    <Form.Control 
                                                                    placeholder="-"
                                                                    onChange={ (e) => handleCategoryInputChange(e) }
                                                                    />
                                                                </FloatingLabel>

                                                                <div className="text-danger mt-1 mx-1">
                                                                    {categoryError}
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-2 d-flex align-items-start justify-content-center mt-2">
                                                                <button 
                                                                className="btn btn-sm btn-success fs-5"
                                                                type="button"
                                                                onClick={handleCategorySubmit}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm d-flex align-items-center gap-2">
                                                        {categories.map((category) => {
                                                            return (
                                                                <div 
                                                                key={category}
                                                                className="bg-secondary d-flex align-items-center rounded-2 px-1 ps-2"
                                                                >
                                                                    {category}
                                                                    <button
                                                                    className="btn btn-sm text-danger py-0 px-1 ms-1"
                                                                    type="button"
                                                                    onClick={ () => removeCategory(category) }
                                                                    >
                                                                        X
                                                                    </button>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div key={"firstBid"} className="col-sm mb-4">
                                                        <FloatingLabel className="text-black" label={labels.firstBid}>
                                                            <Form.Control 
                                                            placeholder="-"
                                                            type="number"
                                                            { ...register("firstBid", { valueAsNumber: true }) }
                                                            />
                                                        </FloatingLabel>
                                                        <div className="text-danger mt-1 mx-1">{errors.firstBid?.message}</div>
                                                    </div>

                                                    <div key={"buyPrice"} className="col-sm mb-4">
                                                        <FloatingLabel className="text-black" label={labels.buyPrice}>
                                                            <Form.Control 
                                                            placeholder="-"
                                                            type="number"
                                                            { ...register("buyPrice", { valueAsNumber: true }) }
                                                            />
                                                        </FloatingLabel>
                                                        <div className="text-danger mt-1 mx-1">{errors.buyPrice?.message}</div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div key={"location"} className="col-sm mb-4">
                                                        <FloatingLabel className="text-black" label={labels.location}>
                                                            <Form.Control 
                                                            placeholder="-"
                                                            { ...register("location") }
                                                            />
                                                        </FloatingLabel>
                                                        <div className="text-danger mt-1 mx-1">{errors.location?.message}</div>
                                                    </div>

                                                    <div key={"country"} className="col-sm mb-4">
                                                        <FloatingLabel className="text-black" label={labels.country}>
                                                            <Form.Control 
                                                            placeholder="-"
                                                            { ...register("country") }
                                                            />
                                                        </FloatingLabel>
                                                        <div className="text-danger mt-1 mx-1">{errors.country?.message}</div>
                                                    </div>
                                                </div>

                                                <div className="row d-flex justify-content-center">
                                                    <div key={"ends"} className="col-sm-6 mb-4">
                                                        <FloatingLabel className="text-black" label={labels.ends}>
                                                            <Form.Control 
                                                            placeholder="-"
                                                            type="datetime-local"
                                                            { 
                                                                ...register("ends", { 
                                                                    setValueAs: v => new Date(v).toISOString()
                                                                })
                                                            }
                                                            />
                                                        </FloatingLabel>
                                                        <div className="text-danger mt-1 mx-1">{errors.ends?.message}</div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div key={"description"} className="mb-4">
                                                        <FloatingLabel className="text-black" label={labels.description}>
                                                            <Form.Control 
                                                            placeholder="-"
                                                            as="textarea"
                                                            // rows={2}
                                                            { ...register("description") }
                                                            />
                                                        </FloatingLabel>
                                                        <div className="text-danger mt-1 mx-1">{errors.description?.message}</div>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-center">
                                                    { 
                                                        loading ?
                                                            <div className="spinner-border mt-3" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        : 
                                                            <button
                                                            className="btn btn-outline-light btn-lg px-5 mt-3"
                                                            type="submit"
                                                            onClick={ () => setErrorMessage("") }
                                                            >
                                                                Save Item
                                                            </button>
                                                    }
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                errorMessage ? <ErrorPopup errorMessage={errorMessage} /> : null
            }
        </section>
    );
}

export default CreateItem;