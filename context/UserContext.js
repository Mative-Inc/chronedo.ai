"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Decode token and set user data
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                console.log(decodedUser)
                setUser(decodedUser);
            } catch (error) {
                console.error('Invalid token:', error);
                logout();
            }
        }
    }, []);

    // Login function
    const login = (token) => {
        localStorage.setItem('token', token);
        
        const decodedUser = jwtDecode(token);
        console.log(decodedUser);

        setUser(decodedUser);
        router.push('/dashboard');
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/signin');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);
