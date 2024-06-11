import React, { useState, useEffect, createContext } from 'react';
import { storageController } from '../../services/token';
import { usersService } from '../../services/users';
import { tokenExpired } from '../../utils/tokenExpired';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;

    //Crear el estado del usuario
    const [user, setUser] = useState(null);

    //Creal el estado de carga
    const [loading, setLoading] = useState(true);

    // Estado para almacenar el token
    const [token, setToken] = useState(null);

    //Función getSession para obtener el token almacenado en el storage.
    const getSession = async () => {
        const token = await storageController.getToken();

        if(!token){
            logout();
            setLoading(false);
            return;
        }
        if(tokenExpired(token)){
            logout();
        } else {
            login(token);
        }


        //console.log('Token ------>', storedToken);
        setLoading(false);

    };

    // Se ejecuta al montar el componente para obtener el token almacenado
    useEffect(() => {
        getSession();
    }, []);

    //Función para login - almacenar token
    const login = async (token) => {
        try {
            await storageController.setToken(token);
            const response = await usersService.getMe(token);
            setUser(response);
            setLoading(false); // Actualiza el estado del token
            console.log(response)
        } catch (error) {
            console.log('Error al iniciar sesión:', error);
            setLoading(false);
        }
    };

    //Cerrar sesión
    const logout = async () => {
        try{
            await storageController.removeToken();
            setUser(null);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    //UpdateUser
    const upDateUser = (key, value) => {
        setUser({
            ...user,
            [key]: value
        })
    }
 
    const data = {
        user, // Incluye el token en el contexto
        login,
        logout: () => console.log('logout'),
        updateUser: () => console.log('update user')
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
