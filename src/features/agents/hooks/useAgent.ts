import { useQuery } from '@tanstack/react-query';
import { getAgentByCode } from '../../../services/agents.service';

export const useAgent = (code: string | null) => {
    return useQuery({
        queryKey: ['agent', code],
        queryFn: () => getAgentByCode(code!),
        enabled: !!code,
    });
};


