import { jwtDecode } from "jwt-decode";
import { ENV } from "../utils/constants";
import { authFetch } from "../utils/authFetch";
import axios from 'axios';

const getMe = async (token) => {
    try {
        const decoded = jwtDecode(token)
        const userId = decoded.id
        const url =`${ENV.API_URL}/${ENV.ENDPOINTS.USER}/${userId}`
        const response = await authFetch(url);

        return await response.json();
    } catch (error) {
        console.log(error);
    }

}




const updateUser = async (userId, userData) => {
    try {
        const token = localStorage.getItem('token'); 

        if (!token) {
            
            throw new Error('No hay token disponible');
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}/${userId}`;

        const response = await axios.put(url, userData, {
            headers: {
                'x-access-token': token,
            },
        });

        if (response.status !== 200) {
            throw new Error(`Failed to update user data: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
        throw error;
    }
};







export const usersService = {
    getMe,
    updateUser
}



