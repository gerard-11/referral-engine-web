import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/services/api';
import { useAuthStore } from '../../auth/store/auth.store.ts';

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
        onSuccess: (updatedUserData) => {
            useAuthStore.setState({ user: updatedUserData });
            queryClient.invalidateQueries({
                queryKey: ['agent'],
                exact: false,
            });
        },
    });
};
