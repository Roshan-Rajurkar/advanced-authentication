import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };
    const handleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    };

    const inputRef = useRef();

    useEffect(() => {
        // Focus logic for input field
    }, []);

    const handlePasswordChange = (e) => {
        // Password change logic
    };

    const handleConfirmPasswordChange = (e) => {
        // Confirm password change logic
    };

    return (
        <div className='flex gap-8 max-w-screen h-screen justify-center items-center'>
            <div className='flex flex-col gap-4 px-12 py-8 bg-red-50 rounded-lg w-2/6'>
                <h1 className='text-2xl mb-3'>Reset password</h1>

                <div>
                    <label htmlFor="password" className='text-slate-500'>New Password</label>
                    <div className='relative flex items-center'>
                        <input
                            id="password"
                            placeholder='Password'
                            ref={inputRef}
                            onChange={handlePasswordChange}
                            className='w-full border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40'
                            type={showPassword ? "password" : "text"}
                        />
                        {showPassword ? <FaEye onClick={handleShowPassword} className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' /> : <FaEyeSlash className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' onClick={handleShowPassword} />}
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className='text-slate-500'>Confirm Password</label>
                    <div className='relative flex items-center'>
                        <input
                            id="confirmPassword"
                            placeholder='Password'
                            onChange={handleConfirmPasswordChange}
                            className='w-full border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40'
                            type={showConfirmPassword ? "password" : "text"}
                        />
                        {showConfirmPassword ? <FaEye onClick={handleConfirmPassword} className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' /> : <FaEyeSlash className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' onClick={handleConfirmPassword} />}
                    </div>
                </div>

                <div className="flex w-full justify-around items-center">
                    <button className="border w-full bg-red-400 hover:bg-red-300 px-1 py-2 text-gray-100">
                        Save Password
                    </button>
                </div>
                <Link to='/login' className='text-blue-700 underline'>Login Again</Link>
            </div>
        </div>
    );
};

export default ResetPassword;
