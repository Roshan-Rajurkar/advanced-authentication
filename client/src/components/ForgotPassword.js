import React, { useEffect, useRef, useState } from 'react';

const ForgotPassword = () => {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const [emailStatus, setEmailStatus] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailSent = () => {
        setLoading(true);

        setTimeout(() => {
            setEmailStatus(!emailStatus);
            setLoading(false);
        }, 5000);
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
                        className='max-w border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-3 w-full justify-around items-center">
                    <button
                        className={`w-full bg-red-400 hover:bg-red-300 px-1 py-2 text-gray-100 ${loading && 'cursor-not-allowed'}`}
                        onClick={handleEmailSent}
                        disabled={emailStatus || loading}
                    >
                        {loading ? 'Sending...' : emailStatus ? 'Sent ✅' : 'Send Email'}
                    </button>

                    {/* 
                    {emailStatus && (
                        <button onClick={handleEmailSent} className='underline text-blue-500'>
                            Resend
                        </button>
                    )} */}

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
