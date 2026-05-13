import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deactivateAgent } from '../services/admin.service';

export const useDeactivateAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ agentId, reason }: { agentId: string; reason: string }) =>
            deactivateAgent(agentId, reason),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['adminAgents'] });
            queryClient.invalidateQueries({
                queryKey: ['agentDetail', variables.agentId],
            });
        },
    });
};
