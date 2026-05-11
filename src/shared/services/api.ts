import axios from 'axios';
import { isTokenExpiringSoon } from '../utils/jwt';
import { clearAuthCookies } from '../utils/cookies';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

let refreshPromise: Promise<string> | null = null;

async function doRefresh(): Promise<string> {
    if (!refreshPromise) {
        refreshPromise = axios.post(
                `${import.meta.env.VITE_API_URL}/auth/refresh`,
                {},
                { withCredentials: true }
            )
            .then(({ data }) => {
                localStorage.setItem('token', data.accessToken);
                return data.accessToken;
            })
            .catch((error) => {
                localStorage.removeItem('token');
                clearAuthCookies();
                axios.post(
                        `${import.meta.env.VITE_API_URL}/auth/logout`,
                        {},
                        { withCredentials: true }
                    )
                    .catch(() => {});
                throw error;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }
    return refreshPromise;
}

api.interceptors.request.use(async (config) => {
    const isAuthRoute =
        config.url?.includes('/auth/') ||
        config.url?.includes('/users/register');

    if (isAuthRoute) return config;

    let token = localStorage.getItem('token');

    if (token && isTokenExpiringSoon(token, 2)) {
        try {
            token = await doRefresh();
        } catch {
            window.location.href = '/';
            return Promise.reject(new Error('Session expired'));
        }
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isAuthRoute =
            originalRequest.url?.includes('/auth/') ||
            originalRequest.url?.includes('/users/register');

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isAuthRoute
        ) {
            originalRequest._retry = true;

            try {
                const newToken = await doRefresh();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch {
                localStorage.removeItem('token');
                clearAuthCookies();
                window.location.href = '/';
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);