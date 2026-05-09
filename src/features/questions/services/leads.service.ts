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
    id: string;
    name: string;
    email: string;
    phone: string;
    score: number;
    classification: 'GREEN' | 'YELLOW' | 'RED';
    createdAt: string;
}

export const createLead = async (data: LeadInput): Promise<LeadResponse> => {
    const response = await api.post('/leads', data);
    return response.data;
};
