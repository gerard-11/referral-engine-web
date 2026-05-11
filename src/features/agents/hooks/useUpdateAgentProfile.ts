import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/services/api';

interface UpdateAgentProfileDto {
    name?: string;
    bio?: string;
    avatarUrl?: string;
    phoneNumber?: string;
}

export const useUpdateAgentProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateAgentProfileDto) => {
            const response = await api.patch('/agents/profile', data);
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['agent'] });
        },
    });
};
