import { storageController } from "../services/token" //Para traernos el token
import { tokenExpired } from "./tokenExpired"


export const authFetch = async (url, params) => {
    const token = await storageController.getToken();

    const logout = () => {
        storageController.removeToken();
    }

    if (!token) {
        logout();
    } else {

        if (tokenExpired(token)) {
            logout();
        } else {
            const response = tokenExpired(token);
            const options = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                }
            } 
            
            try {
                return await fetch(url, options)
            } catch (error) {
                console.log(error)
            }
            console.log('Response', response);
        }
    }
}