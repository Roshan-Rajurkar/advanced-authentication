import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { userDetailsContext } from '../context/UserDetailsProvider';

const Dashboard = () => {
    const [userDetails, setUserDetails] = useContext(userDetailsContext);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/getprofile', { credentials: 'include' });

                console.log(response);

                const { username, email } = response.data;
                setUserDetails({ username, email });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        getProfile();
    }, [setUserDetails]);

    if (userDetails.username === '') return <p>User not found.</p>

    return (
        <div>
            <i>Dashboard Page</i>
            <p>Create a user profile here with email and username, a simple profile-like page</p>

            <div>
                <h2>User Details:</h2>
                <p>Username: {userDetails.username}</p>
                <p>Email: {userDetails.email}</p>
            </div>
        </div>
    );
};

export default Dashboard;
