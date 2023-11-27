import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
    const inputRef = useRef();
    const navigate = useNavigate();

    // Define state object for form inputs and validation errors
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form validation
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setFormData({
            username: '',
            email: '',
            password: '',
        });
        setErrors({});

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                navigate('/login');
            } else {
                console.error('Registration failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during registration:', error.message);
        }

    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear the validation error when the user starts typing
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    // Function to perform form validation
    const validateForm = (data) => {
        const errors = {};

        // Validate username
        if (!data.username.trim()) {
            errors.username = 'Username is required';
        } else if (data.username.length < 6) {
            errors.username = 'Username must be at least 6 characters';
        }

        // Validate email
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Invalid email format';
        }

        // Validate password
        if (!data.password.trim()) {
            errors.password = 'Password is required';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    };


    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className='flex gap-8 max-w-screen h-screen justify-center items-center'>
            <div className='flex flex-col gap-4 px-12 py-8 bg-red-50 rounded-lg w-2/6'>
                <h1 className='text-2xl mb-3'>Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <span className='text-slate-500'>Username</span>
                        <input
                            name='username'
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder='Username'
                            ref={inputRef}
                            className={`max-w border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40 ${errors.username ? 'border-red-500' : ''
                                }`}
                            type="text"
                        />
                        {errors.username && <p className='text-red-500'>{errors.username}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-slate-500'>Email</span>
                        <input
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder='Email'
                            className={`max-w border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40 ${errors.email ? 'border-red-500' : ''
                                }`}
                            type="email"
                        />
                        {errors.email && <p className='text-red-500'>{errors.email}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-slate-500'>Password</span>
                        <input
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder='Password'
                            className={`max-w border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40 ${errors.password ? 'border-red-500' : ''
                                }`}
                            type="password"
                        />
                        {errors.password && <p className='text-red-500'>{errors.password}</p>}
                    </div>

                    <div className="flex w-full justify-around items-center mt-2">
                        <button className="border w-3/5 bg-red-400 hover:bg-red-300 px-1 py-2 text-gray-100">
                            Register
                        </button>
                        <Link to="/login" className="text-red-400 hover:text-red-300 w-2/5">
                            <button className="px-1 py-2 text-center w-full">Sign in</button>
                        </Link>
                    </div>
                </form>
                <div className='flex gap-5 items-center'>
                    <input placeholder='Username' type="checkbox" className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded outline-none' />
                    <p>I agree to the terms and conditions of <a className='text-blue-500 underline' href="/">Privacy Policy</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
