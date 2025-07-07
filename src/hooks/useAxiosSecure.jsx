import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
    const { user, signOutUser } = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(config => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        });

        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => response,
            error => {
                const status = error.response?.status;
                const message = error.response?.data?.message || '';

                const safeMessages = [
                    'email not verified',
                    'Forbidden access - can only access your own books',
                    'Unauthorized - User information missing',
                    'Unauthorized access - token invalid or expired',
                ];

                if ((status === 401 || status === 403) && !safeMessages.includes(message)) {
                    signOutUser()
                        .then(() => {
                            Swal.fire({
                                title: 'Session Expired',
                                text: 'You have been signed out due to authorization failure.',
                                icon: 'warning',
                                confirmButtonText: 'OK'
                            });
                        })
                        .catch(err => console.error("Sign-out failed:", err));
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [user, signOutUser]);

    return axiosInstance;
};

export default useAxiosSecure;