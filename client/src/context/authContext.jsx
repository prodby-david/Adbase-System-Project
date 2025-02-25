import React, { useState, createContext, useContext } from 'react';

const AuthContext  = createContext();

export const AuthProvider =  ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('client');
        return savedUser ? JSON.parse(savedUser) : null
    });

    const Login = (userData) => {
        localStorage.setItem('client', JSON.stringify(userData));
        setUser(userData);
    };

    const Logout = () => {
        localStorage.removeItem('client'); 
        localStorage.removeItem('token');
        setUser(null);
    }

 
    return(
        <AuthContext.Provider value={{user, Login, Logout}}>
           { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);