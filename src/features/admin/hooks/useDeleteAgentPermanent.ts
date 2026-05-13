import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAgentPermanent } from '../services/admin.service';

export const useDeleteAgentPermanent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (agentId: string) => deleteAgentPermanent(agentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminAgents'] });
        },
    });
};
