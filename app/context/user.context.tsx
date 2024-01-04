'use client'
import React, { createContext, useContext, useState, ReactNode} from 'react';
import useStorage from '../hooks/useStorage';

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
    const {getItem,setItem,removeItem} = useStorage();
    const [user, setUser] = useState<any | null>(() => {
        // Load user data from sessionStorage on component mount
        
        const storedUser = getItem('user')
        return storedUser ? JSON.parse(storedUser) : null;
      });

    const loginUser = (userData: any) => {
        setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logoutUser = () => {
        removeItem('user');
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