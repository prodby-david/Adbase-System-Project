import React, { useState, createContext, useContext } from 'react';

const AdminContext  = createContext();

export const AdminContextProvider =  ({ children }) => {

    const [admin, setAdmin] = useState(() => {
        const savedAdmin = localStorage.getItem('admin');
        return savedAdmin && savedAdmin !== "undefined" ? JSON.parse(savedAdmin) : null;

    });

    const Login = (adminData) => {
        localStorage.setItem('admin', JSON.stringify(adminData)); 
        setAdmin(adminData);
    };

    const Logout = () => {
        localStorage.removeItem('admin'); 
        localStorage.removeItem('token');
        setAdmin(null);
    }

 
    return(
        <AdminContext.Provider value={{admin, Login, Logout}}>
           { children }
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => useContext(AdminContext);