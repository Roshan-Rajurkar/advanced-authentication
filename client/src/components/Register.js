import React from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
    return (
        <div className='flex gap-8 max-w-screen h-screen justify-center items-center' >
            <div className='flex flex-col gap-4 px-12 py-8 bg-red-50 rounded-lg w-2/6'>
                <h1 className='text-2xl mb-3'>Registration</h1>
                <div className='flex flex-col gap-1'>
                    <span className='text-slate-500'>Username</span>
                    <input placeholder='Username' className='max-w border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40' type="text" />
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-slate-500'>Email</span>
                    <input placeholder='Email' className='max-w border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40' type="email" />
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-slate-500'>Password</span>
                    <input placeholder='Password' className='max-w border rounded-md py-2 px-3 outline-none text-slate-500 bg-slate-50 text-sm placeholder:opacity-40' type="password" />
                </div>

                <div className="flex w-full justify-around items-center">
                    <button className="border w-3/5 bg-red-400 hover:bg-red-300 px-1 py-2 text-gray-100">
                        Register
                    </button>
                    <Link to="/login" className="text-red-400 hover:text-red-300 w-2/5">
                        <button className="px-1 py-2 text-center w-full">Sign in</button>
                    </Link>
                </div>
                <div className='flex gap-5 items-center'>
                    <input placeholder='Username' type="checkbox" className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded outline-none' />
                    <p>I agree to the terms and conditions of <a className='text-blue-500 underline' href="/">Privacy Policy</a>.</p>
                </div>
            </div>
        </div>
    )
}

export default Register;