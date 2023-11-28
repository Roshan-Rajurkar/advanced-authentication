import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const ResetPassword = () => {
    const { resetPasswordToken } = useParams();
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if (newConfirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSavePassword = async () => {
        if (!password || !confirmPassword || confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/auth/resetpassword/${resetPasswordToken}`, {
                newPassword: password,
            });

            if (response.status === 200) {
                setSuccessMessage('Password reset successful');
                setPassword('');
                setConfirmPassword('');
                // You can redirect the user or perform any other action on success
            } else {
                setServerError('Failed to reset password. Please try again later.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setServerError('Invalid or expired reset token. Please request a new reset link.');
            } else {
                setServerError('Failed to reset password. Please try again later.');
            }
        }
    };

    return (
        <div className='flex gap-8 max-w-screen h-screen justify-center items-center'>
            <div className='flex flex-col gap-4 px-12 py-8 bg-red-50 rounded-lg w-2/6'>
                <h1 className='text-2xl mb-3'>Reset password</h1>

                {successMessage && <p className='text-green-500 text-xs'>{successMessage}</p>}

                <div>
                    <label htmlFor="password" className='text-slate-500'>New Password</label>
                    <div className='relative flex items-center'>
                        <input
                            id="password"
                            placeholder='Password'
                            ref={inputRef}
                            onChange={handlePasswordChange}
                            value={password}
                            className={`w-full border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40 ${passwordError && 'border-red-500'}`}
                            type={showPassword ? "text" : "password"}
                        />
                        {showPassword ? (
                            <FaEyeSlash onClick={handleShowPassword} className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' />
                        ) : (
                            <FaEye onClick={handleShowPassword} className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' />
                        )}
                    </div>
                    {passwordError && <p className='text-red-500 text-xs'>{passwordError}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className='text-slate-500'>Confirm Password</label>
                    <div className='relative flex items-center'>
                        <input
                            id="confirmPassword"
                            placeholder='Confirm Password'
                            onChange={handleConfirmPasswordChange}
                            value={confirmPassword}
                            className={`w-full border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40 ${confirmPasswordError && 'border-red-500'}`}
                            type={showConfirmPassword ? "text" : "password"}
                        />
                        {showConfirmPassword ? (
                            <FaEyeSlash onClick={handleShowConfirmPassword} className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' />
                        ) : (
                            <FaEye onClick={handleShowConfirmPassword} className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' />
                        )}
                    </div>
                    {confirmPasswordError && <p className='text-red-500 text-xs'>{confirmPasswordError}</p>}
                </div>

                <div className="flex w-full justify-around items-center">
                    <button
                        className={`border w-full bg-red-400 hover:bg-red-300 px-1 py-2 text-gray-100 ${!password || !confirmPassword || confirmPasswordError ? 'cursor-not-allowed' : ''}`}
                        onClick={handleSavePassword}
                        disabled={!password || !confirmPassword || confirmPasswordError}
                    >
                        Save Password
                    </button>
                </div>
                <Link to='/login' className='text-blue-700 underline'>Login Again</Link>

                {serverError && <p className='text-red-500 text-xs'>{serverError}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
