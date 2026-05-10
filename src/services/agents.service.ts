import { api } from '../shared/services/api';
import type { AgentProfile } from '../shared/types/types';

export const getAgentByCode = async (code: string): Promise<AgentProfile> => {
    const response = await api.get(`/agents/${code}`);
    return response.data;
};
