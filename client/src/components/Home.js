import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='flex w-full h-screen items-center justify-center'>
            <div className='flex gap-2'>
                <Link to='/register' className='text-2xl font-bold underline text-blue-600'>Register</Link>
                <span className='text-2xl font-bold text-black'>/</span>
                <Link to='login' className='text-2xl font-bold underline text-green-600'>Login</Link>
            </div>
        </div>
    )
}

export default Home