import { create } from 'zustand';
import type {LoginCredentials, LoginResponse, RegisterCredentials, User} from '../../../shared/types/types.ts';
import { AuthService } from '../../../services/auth.service.ts';

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
            const response = await AuthService.me();
            set({ user: response.data, isLoading: false });
        } catch  {
            set({ user: null, accessToken: null, isLoading: false });
            localStorage.removeItem('token');
        }
    },

    login: async (data) => {
        try {
            set({ isLoading: true, error: null });

            const response = await AuthService.login(data);

            const { accessToken } = response.data as LoginResponse;
            localStorage.setItem('token', accessToken);
            const me= await AuthService.me();
            const user= me.data
            
            set({
                accessToken,
                isLoading: false,
                user
            });
        } catch (error:any) {
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
            const registerRes=await AuthService.register(data);
            const user= registerRes.data;
            const loginRes = await AuthService.login({
                email: data.email,
                password: data.password,
            });
            const { accessToken } = loginRes.data;

            localStorage.setItem('token', accessToken);

            set({
                accessToken,
                user,
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
    logout: () => {
        localStorage.removeItem('token');
        set({
            user: null,
            accessToken: null,
        });
    },
}));