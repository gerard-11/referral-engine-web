export interface LoginCredentials {
    email: string;
    password: string;
}

export type Role = 'AGENT' | 'CLIENT' | 'ADMIN';

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    role: Role;
    referralCode?: string;
    clientScore?: {
        greenLeads: number;
    };
    agentCode?: string;
    agent?:{
        name: string;
        email: string;
        agentCode?: string | null | undefined;
        id?: string;
    } | undefined;
}

export interface LoginResponse {
    accessToken: string;
    agentCode: string;
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
    isActive?: boolean;
    createdAt: string;
}

export interface ReviewClient {
    name: string;
    id?: string;
}

export interface ReviewReceived {
    id: string;
    content: string;
    rating: number;
    createdAt: string;
    client: ReviewClient;
}

export interface AgentProfile {
    id: string;
    name: string;
    referralCode: string;
    bio?: string;
    avatarUrl?: string;
    reviewsReceived?: ReviewReceived[];
}

export interface LeadForAdminDetail {
    id: string;
    name: string;
    email: string;
    score: number;
    status: 'GREEN' | 'YELLOW' | 'RED';
    createdAt: string;
}

export interface ClientForAdminDetail {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: string;
}

export interface AgentForAdminList {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: string;
}

export interface AgentDetailForAdmin {
    id: string;
    name: string;
    email: string;
    role: Role;
    isActive: boolean;
    deactivatedAt: string | null;
    deactivationReason: string | null;
    createdAt: string;
    clients: ClientForAdminDetail[];
    leadsAsAgent: LeadForAdminDetail[];
}

export interface AgentCodeResponse {
    code: string;
    createdAt: string;
}

export interface CreateAdminUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: string;
}

export interface Review {
    id: string;
    agentId: string;
    clientId: string;
    rating: number;
    content: string;
    isVisible: boolean;
    createdAt: string;
}

export interface CreateReviewRequest {
    agentId: string;
    rating: number;
    content: string;
}
