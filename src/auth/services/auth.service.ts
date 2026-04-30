import { api } from '../../shared/services/api.ts';


export class AuthService {
    static async register(data: {
        name: string;
        email: string;
        password: string;
    }) {
          return await api.post('/users/register', data);
    }

     static async login(data: {
       email: string;
        password: string;
    }) {
        return api.post('/auth/login', data);
    }

    static async refresh() {
        return api.post('/auth/refresh');
    }

    static async me() {
        return api.get('/auth/me');
    }
}