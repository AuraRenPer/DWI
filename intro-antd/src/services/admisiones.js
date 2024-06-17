import axios from 'axios';
import { ENV } from '../utils/constants';

export const getAdmisions = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.ADMISION}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las admisiones:', error);
        throw error;
    }
};

const addProduct = async (newName, newActivo, token) => {
    return axios.post(`${ENV.API_URL}/${ENV.ENDPOINTS.ADMISION}`, {
        nombre: newName,
        activo: newActivo,
    }, {
        headers: {
            'x-access-token': token
        }
    });
};

export default {
    getAdmisions,
    addProduct,
};
