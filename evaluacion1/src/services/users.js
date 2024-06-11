import { jwtDecode } from "jwt-decode";
import { ENV } from '../utils/constants';
import { authFetch } from "../utils/authFetch";

//Constante para almacenar token decodificado

const getMe = async (token) => {

    try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`
        const response = await authFetch(url)

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}


//Constante userId que recibe valor de Id.

export const usersService = {
    getMe
}