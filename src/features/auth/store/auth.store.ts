import { create } from 'zustand';
import type {LoginCredentials, LoginResponse, RegisterCredentials, User} from '../../../shared/types/types.ts';
import { AuthService } from '../../../services/auth.service.ts';
import { clearAuthCookies } from '../../../shared/utils/cookies.ts';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;

    login: (data: LoginCredentials) => Promise<void>;
    register: (data: RegisterCredentials) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: localStorage.getItem('token'),
    isLoading: false,
    error: null,

    checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            set({ isLoading: true });
            const response = await AuthService.me(token);
            set({ user: response.data, isLoading: false });
        } catch  {
            set({ user: null, accessToken: null, isLoading: false });
            localStorage.removeItem('token');
            clearAuthCookies();
        }
    },

    login: async (data) => {
        try {
            set({ isLoading: true, error: null });

            const response = await AuthService.login(data);
            const { accessToken} = response.data as LoginResponse;
            localStorage.setItem('token', accessToken);
            const me= await AuthService.me(accessToken);
            const user= me.data
            
            set({
                accessToken,
                isLoading: false,
                user
            });
        } catch (error:any) {
            console.log(error.message);
            set({
                error: error.response?.data?.message || 'Error al iniciar sesión',
                isLoading: false,
            });
            throw error;
        }
    },
    register: async (data) => {
        try {
            set({ isLoading: true, error: null });
           await AuthService.register(data);

            const loginRes = await AuthService.login({
                email: data.email,
                password: data.password,
            });

            const { accessToken } = loginRes.data;

            localStorage.setItem('token', accessToken);

            const me= await AuthService.me();


            set({
                accessToken,
                user:me.data,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Error al registrarse',
                isLoading: false,
            });
            throw error;
        }
    },
    logout: async () => {
        try {
            await AuthService.logout();
        } catch (error) {
            console.error('Error en logout:', error);
        } finally {
            localStorage.removeItem('token');
            clearAuthCookies();
            set({
                user: null,
                accessToken: null,
            });
        }
    },
}));