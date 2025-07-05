import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

import { login } from "../store/authSlice";
import authService from "../appwrite/auth";
import {
    Button,
    Input,
    Logo
} from './index';


function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [backendError, setBackendError] = useState('');
    const { 
        register, 
        handleSubmit,
        formState : {errors}
    } = useForm();

    // Queries appwrite backend and accordingly updates front-end data-store 
    const create = async (data) => {
        setBackendError('');
        try {
            const newUser = await authService.createAccount(data);
            
            if (newUser) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate('/');
            }
            
        } catch (backendError) {
            console.log(backendError);
            if (backendError.code === 401) {
                setBackendError("Invalid email or password.");
            } else if (backendError.code === 409) {
                setBackendError("Email is already registered.");
            } else {
                setBackendError(backendError.message || "Something went wrong.");
            }
            console.log(backendError);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen"> {/* Added min-h-screen for centering */}
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Display Backend Errors */}
                {
                    backendError &&
                    (
                        <div className="mt-6 p-4 text-sm rounded-md text-red-800 bg-red-100 border border-red-300 text-center">
                            {backendError}
                        </div>
                    )
                }

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full name is required", // Add specific message
                            })}
                        />
                        {/* Display client-side validation error for name */}
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required", // Add specific message
                                validate: {
                                    // More robust email regex
                                    matchPattern: (value) =>
                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {/* Display client-side validation error for email */}
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required", // Add specific message
                                minLength: { // Example: add minLength
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                }
                            })}
                        />
                        {/* Display client-side validation error for password */}
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                        <Button
                            type="submit"
                            className="w-full"
                            text={'Create Account'}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;