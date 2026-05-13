import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAgentCode } from '../services/admin.service';

export const useCreateAgentCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAgentCode,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminAgents'] });
        },
    });
};
