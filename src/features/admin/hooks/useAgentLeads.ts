import { useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/services/api';

export interface LeadResponse {
    id: string;
    name: string;
    email: string;
    score: number;
    status: 'GREEN' | 'YELLOW' | 'RED';
    createdAt: string;
    clientId?: string;
    phone?: string;
    isContacted?: boolean;
    comments?: string;
}

export interface LeadsResponse {
    data: LeadResponse[];
    summary?: {
        total: number;
        GREEN: number;
        YELLOW: number;
        RED: number;
    };
}

const getAgentLeadsData = async (agentId: string): Promise<LeadsResponse> => {
    const response = await api.get(`/leads/agent/${agentId}`);
    return response.data;
};

export const useAgentLeads = (agentId: string | null) => {
    return useQuery<LeadsResponse>({
        queryKey: ['agentLeads', agentId],
        queryFn: () => getAgentLeadsData(agentId!),
        enabled: !!agentId,
    });
};
