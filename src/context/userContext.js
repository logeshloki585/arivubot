"use client"
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [chatbotId, setChatbotId] = useState(null);

    const setChatbot = (id) => {
        setChatbotId(id);
    };

    return (
        <UserContext.Provider value={{ chatbotId, setChatbot }}>
            {children}
        </UserContext.Provider>
    );
};
