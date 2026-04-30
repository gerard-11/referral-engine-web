export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    name: string;
    username: string;
    email: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    name: string;
    id: string;
    email: string;
    referralCode: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

