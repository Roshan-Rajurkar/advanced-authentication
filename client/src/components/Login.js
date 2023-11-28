import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [show, setShow] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleShow = () => {
        setShow(!show);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validateForm = () => {
        const validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            validationErrors.email = 'Invalid email format';
        }

        if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
        }

        return validationErrors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData, { credentials: 'include' });

            if (response.status === 200) {
                // Login successful
                // You can handle the successful login logic, such as storing the token in local storage
                // For now, redirect to a different page
                navigate('/dashboard');
            } else {
                console.error('Login failed:', response.statusText);

                if (response.data && response.data.message) {
                    setErrors({ general: response.data.message });
                } else {
                    setErrors({ general: 'Login failed. Please check your credentials and try again.' });
                }
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            setErrors({ general: 'An error occurred. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex gap-8 max-w-screen h-screen justify-center items-center'>
            <div className='flex flex-col gap-4 px-12 py-8 bg-red-50 rounded-lg w-2/6'>
                <h1 className='text-2xl mb-3'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <span className='text-slate-500'>Email</span>
                        <input
                            placeholder='Email'
                            ref={inputRef}
                            className={`max-w border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40 ${errors.email ? 'border-red-500' : ''}`}
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className='text-red-500'>{errors.email}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-slate-500'>Password</span>
                        <div className='relative flex items-center'>
                            <input
                                placeholder='Password'
                                className={`w-full border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40 ${errors.password ? 'border-red-500' : ''}`}
                                type={show ? 'password' : 'text'}
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {show ? (
                                <FaEye onClick={handleShow} className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' />
                            ) : (
                                <FaEyeSlash className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' onClick={handleShow} />
                            )}
                        </div>
                        {errors.password && <p className='text-red-500'>{errors.password}</p>}
                        <span>
                            <Link to='/forgotpassword'>
                                <a className='text-blue-700 m-y-1 text-sm' href='/'>
                                    forgot your password?
                                </a>
                            </Link>
                        </span>
                    </div>
                    <div className='flex w-full justify-around items-center'>
                        <button
                            disabled={loading}
                            className='border w-3/5 bg-red-400 hover:bg-red-300 px-1 py-2 text-gray-100'
                            onClick={handleSubmit}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        <Link to='/register' className='text-red-400 hover:text-red-300 w-2/5'>
                            <button className='px-1 py-2 text-center w-full'>Register</button>
                        </Link>
                    </div>
                </form>
                {errors.general && <p className='text-red-500'>{errors.general}</p>}
            </div>
        </div>
    );
};

export default Login;
