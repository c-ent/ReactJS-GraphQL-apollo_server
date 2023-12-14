// ProtectedRoutes.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const ProtectedRoutes = () => {
    const {isLoggedIn} = useAuth();

    return(

        isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
    

    )
};

export default ProtectedRoutes;
