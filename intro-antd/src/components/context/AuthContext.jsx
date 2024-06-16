import React, { useState, useEffect, createContext } from 'react';
import { storageController } from '../../services/token'; // Importa el controlador de almacenamiento
import { usersService } from '../../services/users';
import { tokenExpired } from '../../utils/tokenExpired';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSession();
    }, []);

    const getSession = async () => {
        const token = await storageController.getToken();
        if (!token) {
            logout();
            setLoading(false);
            return;
        }
        if (tokenExpired(token)) {
            logout();
        } else {
            login(token);
        }
    }

    const login = async (token) => {
        try {
            console.log('Obteniendo', token);
            await storageController.setToken(token);
            const response = await usersService.getMe(token);
            setUser(response);
            setLoading(false);
            console.log(response); //muestra el objeto del usuario en consola
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            await storageController.removeToken();
            setUser(null);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const data = {
        user,
        token: storageController.getToken(), // Asegúrate de exponer el token
        login,
        logout,
        upDataUser: () => console.log('update user')
    };

    if (loading) return null;
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
