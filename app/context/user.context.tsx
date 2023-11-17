'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextProps {
    user: any | null; // Replace 'any' with your actual user data type
    loginUser: (userData: any) => void; // Replace 'any' with your actual user data type
    logoutUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null); // Replace 'any' with your actual user data type

    const loginUser = (userData: any) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};