const axios = require('axios');
import { useState } from 'react';
import { REFRESH_TOKEN } from './endpoints';



const useAxiosIntercepter = () => {
    const [isLoading, setIsLoading] = useState(false)
    const axiosApiInstance = axios.create();

    // Request interceptor for API calls


    axiosApiInstance.interceptors.request.use(
        async config => {
            setIsLoading(true)
            const session = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
            if (config.Auth) {
                config.headers = {
                    'Authorization': `Bearer ${session.accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }

            return config;
        },
        error => {
            setIsLoading(false)
            Promise.reject(error)
        });

    // Response interceptor for API calls
    axiosApiInstance.interceptors.response.use((response) => {
        setIsLoading(false)
        return response
    }, async function (error) {
        const session = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await getRefreshToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`;
            return axiosApiInstance(originalRequest);
        }
        return Promise.reject(error);
    });

    const getRefreshToken = async () => {
        const session = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
        await axios.get(`${REFRESH_TOKEN}/${session.refreshToken}`, {
            headers: {
                Authorization: 'Bearer ' + session.accessToken
            }
        })
            .then((res) => {
                localStorage.setItem('ACCESS_TOKEN', JSON.stringify(res.data));
            }).catch((err) => err);
    }

    return {
        axiosApiInstance,
        isLoading
    }

}
export default useAxiosIntercepter;