import React from 'react';
import { Link } from 'react-router-dom';

function PostSignupComponent() {
    return (
        <section className="gradient-custom">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                <div className="card-body p-5 text-center">

                    <div className="mt-md-4 pb-2">

                        <h2 className="fw-bold mb-5">Sign Up</h2>

                        <div className="fs-5 mb-5">
                        <div className="mb-3">Sign Up was Successful!</div>

                        <div>Please wait until Admin enables your account.</div>
                        </div>

                        <Link to="/" className="text-white fw-bold fs-5">Go to Homepage</Link>

                    </div>

                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
    );
}

export default PostSignupComponent;