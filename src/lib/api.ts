import axios, { AxiosError, AxiosResponse } from "axios"

export const BACKEND_API = axios.create({
    baseURL: "/api",
    withCredentials: true,
    timeout: 60 * 1000,
})

/**
 * Axios Response 
 */
BACKEND_API.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        return error.response?.data ? Promise.reject(error.response.data) : Promise.reject(error);
    }
);