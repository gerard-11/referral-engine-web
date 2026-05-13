import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reactivateAgent } from '../services/admin.service';

export const useReactivateAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (agentId: string) => reactivateAgent(agentId),
        onSuccess: (_data, agentId) => {
            queryClient.invalidateQueries({ queryKey: ['adminAgents'] });
            queryClient.invalidateQueries({ queryKey: ['agentDetail', agentId] });
        },
    });
};
