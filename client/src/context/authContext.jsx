import React, { useState, createContext, useContext } from 'react';

const AuthContext  = createContext();

export const AuthProvider =  ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('client-user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const Login = (userData) => {
        localStorage.setItem('client-user', JSON.stringify(userData.user));
        setUser(userData.user);
    };

    const Logout = () => {
        localStorage.removeItem('client-user'); 
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