import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
    const [show, setShow] = useState(true)
    const handleShow = () => {
        setShow(!show);
    }
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, [])
    return (
        <div className='flex gap-8 max-w-screen h-screen justify-center items-center' >
            <div className='flex flex-col gap-4 px-12 py-8 bg-red-50 rounded-lg w-2/6'>
                <h1 className='text-2xl mb-3'>Login</h1>

                <div className='flex flex-col gap-1'>
                    <span className='text-slate-500'>Email</span>
                    <input placeholder='Email' ref={inputRef} className='max-w border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40' type="email" />
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-slate-500'>Password</span>
                    <div className='relative flex items-center'>
                        <input
                            placeholder='Password'
                            className='w-full border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40'
                            type={show ? "password" : "text"}
                        />
                        {show ? <FaEye onClick={handleShow} className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' /> : <FaEyeSlash className='absolute right-3 bg-white h-9/10 hover:cursor-pointer' onClick={handleShow} />}
                    </div>
                    <span><Link to='/forgotpassword'>
                        <a className='text-blue-700 m-y-1 text-sm' href="/">Forgot your password?</a>
                    </Link></span>

                </div>

                <div className="flex w-full justify-around items-center">
                    <button className="border w-3/5 bg-red-400 hover:bg-red-300 px-1 py-2 text-gray-100">
                        Login
                    </button>
                    <Link to="/register" className="text-red-400 hover:text-red-300 w-2/5">
                        <button className="px-1 py-2 text-center w-full">Register</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;