import type { Question } from "../../../shared/types/types.ts";
import { api } from "../../../shared/services/api";

export const getQuestions = async (): Promise<Question[]> => {
    const response = await api.get('/questions');
    return response.data;
};

export const createQuestion = async (data: { text: string; weight: number }) => {
    const response = await api.post('/questions', data);
    return response.data;
};

export const updateQuestion = async (id: string, data: { text: string; weight: number; isActive: boolean }) => {
    const response = await api.patch(`/questions/${id}`, data);
    return response.data;
};

export const deleteQuestion = async (id: string) => {
    await api.delete(`/questions/${id}`);
};

export const getAgentQuestions = async (agentId: string): Promise<Question[]> => {
    const response = await api.get(`questions/agent/${agentId}`);
    return response.data;
};
