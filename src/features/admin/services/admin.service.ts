import { api } from '../../../shared/services/api';
import type {
    AgentForAdminList,
    AgentDetailForAdmin,
    AgentCodeResponse,
    CreateAdminUserRequest,
    AdminUser,
} from '../../../shared/types/types';

export const getAdminAgents = async (): Promise<AgentForAdminList[]> => {
    const response = await api.get('/agents');
    return response.data;
};

export const getAgentDetail = async (agentId: string): Promise<AgentDetailForAdmin> => {
    const response = await api.get(`/agents/${agentId}/full`);
    return response.data;
};

export const createAgentCode = async (): Promise<AgentCodeResponse> => {
    const response = await api.post('/admin/agent-codes', {});
    return response.data;
};

export const createAdminUser = async (
    data: CreateAdminUserRequest,
): Promise<AdminUser> => {
    const response = await api.post('/admin/users', data);
    return response.data;
};

export const deactivateAgent = async (
    agentId: string,
    reason: string,
): Promise<void> => {
    await api.patch(`/admin/agents/${agentId}/deactivate`, { reason });
};

export const reactivateAgent = async (agentId: string): Promise<void> => {
    await api.patch(`/admin/agents/${agentId}/reactivate`, {});
};

export const deleteAgentPermanent = async (agentId: string): Promise<void> => {
    await api.delete(`/admin/agents/${agentId}`);
};
