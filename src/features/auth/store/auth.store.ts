import { create } from 'zustand';
import type {LoginCredentials, LoginResponse, RegisterCredentials, User} from '../../../shared/types/types.ts';
import { AuthService } from '../../../auth/services/auth.service.ts';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;

    login: (data: LoginCredentials) => Promise<void>;
    register: (data: RegisterCredentials) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: localStorage.getItem('token'),
    isLoading: false,
    error: null,

    login: async (data) => {
        try {
            set({ isLoading: true, error: null });

            const response = await AuthService.login(data);

            const { accessToken } = response.data as LoginResponse;

            localStorage.setItem('token', accessToken);

            set({
                accessToken,
                isLoading: false,
            });
        } catch (error:any) {
            set({
                error: error.response?.data?.message || 'Error al iniciar sesión',
                isLoading: false,
            });
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