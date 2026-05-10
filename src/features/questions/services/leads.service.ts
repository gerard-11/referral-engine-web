import { api } from '../../../shared/services/api';

export interface LeadInput {
    name: string;
    email: string;
    phone: string;
    answers: {
        questionId: string;
        value: 0 | 1;
    }[];
}

export interface LeadResponse {
    leadId: string;
    clientId: string;
    agentId: string;
    name: string;
    email: string;
    phone: string;
    score: number;
    status: 'GREEN' | 'YELLOW' | 'RED';
    createdAt: string;
}

export const createLead = async (data: LeadInput): Promise<LeadResponse> => {
    const response = await api.post('/leads', data);
    return response.data;
};

export interface LeadsResponse {
    data: LeadResponse[];
    summary: {
        total: number;
        GREEN: number;
        YELLOW: number;
        RED: number;
    };
}

export const getAgentLeads = async (): Promise<LeadsResponse> => {
    const response = await api.get('/leads/my');
    return response.data;
};
