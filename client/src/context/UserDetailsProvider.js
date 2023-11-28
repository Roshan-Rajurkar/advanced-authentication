// UserDetailsProvider.js

import React, { createContext, useState } from 'react';

export const userDetailsContext = createContext();

const UserDetailsProvider = (prop) => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
    });

    return (
        <userDetailsContext.Provider value={[userDetails, setUserDetails]}>
            {prop.children}
        </userDetailsContext.Provider>
    );
};

export default UserDetailsProvider;
