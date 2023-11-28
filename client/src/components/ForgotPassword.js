import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailStatus, setEmailStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleEmailSent = async () => {
        if (!validateEmail()) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgotpassword', { email });

            if (response.status === 200) {
                setEmailStatus(true);
                setEmail('')
            } else {
                setServerError('Failed to send email. Please try again later.');
            }
        } catch (error) {
            setServerError('Failed to send email. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex gap-8 max-w-screen h-screen justify-center items-center'>
            <div className='flex flex-col gap-4 px-12 py-8 bg-red-50 rounded-lg w-2/6'>
                <h1 className='text-2xl mb-3'>Forgot Password</h1>

                <div className='flex flex-col gap-1'>
                    <span className='text-slate-500'>Email</span>
                    <input
                        placeholder='Email'
                        ref={inputRef}
                        className={`max-w border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40 ${emailError && 'border-red-500'}`}
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className='text-red-500 text-xs'>{emailError}</p>}
                </div>

                <div className='flex flex-col gap-3 w-full justify-around items-center'>
                    <button
                        className={`w-full bg-red-400 hover:bg-red-300 px-1 py-2 text-gray-100 ${loading && 'cursor-not-allowed'}`}
                        onClick={handleEmailSent}
                        disabled={emailStatus || loading}
                    >
                        {loading ? 'Sending...' : emailStatus ? 'Sent ✅' : 'Send Email'}
                    </button>

                    {serverError && <p className='text-red-500 text-xs'>{serverError}</p>}

                    {emailStatus && (
                        <p className='text-italic'>
                            The email has been sent successfully. Please check your email.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
