import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductsPage from '../pages/Products/ProductsPage';
import Navbar from '../Navbar/navbar';
import { useAuth } from '../../hooks/useAuth';

const AppRoutes = () => {
    const { user } = useAuth();

    let routes = useRoutes([
        { path: '/', element: user ? <Home /> : <Login /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/products', element: user ? <ProductsPage /> : <Login /> },
    ]);

    return (
        <>
            {user && <Navbar />}
            {routes}
        </>
    );
};

export default AppRoutes;
