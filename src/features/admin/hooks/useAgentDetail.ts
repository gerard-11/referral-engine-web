import { useQuery } from '@tanstack/react-query';
import { getAgentDetail } from '../services/admin.service';

export const useAgentDetail = (agentId: string | null) => {
    return useQuery({
        queryKey: ['agentDetail', agentId],
        queryFn: () => getAgentDetail(agentId!),
        enabled: !!agentId,
    });
};
