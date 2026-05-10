export interface LoginCredentials {
    email: string;
    password: string;
}

export type Role = 'AGENT' | 'CLIENT';

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    role: Role;
    referralCode?: string;
    agentId?: string;
    clientScore?: {
        greenLeads: number;
    };
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

export interface Referral{
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface ReferralResponse {
    data: Referral[];
    meta: {
        page: number;
        total: number;
    };
}

export interface Question {
    id: string;
    agentId: string;
    text: string;
    weight: number;
    isActive: boolean;
    createdAt: string;
}

export interface AgentProfile {
    id: string;
    name: string;
    referralCode: string;
    bio?: string;
    avatarUrl?: string;
}

