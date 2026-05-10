import { useQuery } from '@tanstack/react-query';
import { getAgentQuestions } from '../services/questions.service';
import type { Question } from '../../../shared/types/types';

export const useAgentQuestions = (agentId: string | undefined) => {
    return useQuery<Question[]>({
        queryKey: ['agent-questions', agentId],
        queryFn: () => getAgentQuestions(agentId!),
        enabled: !!agentId,
    });
};
