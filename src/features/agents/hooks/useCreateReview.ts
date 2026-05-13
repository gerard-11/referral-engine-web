import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview } from '../services/agents.service';
import type { CreateReviewRequest } from '../../../shared/types/types';

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReviewRequest) => createReview(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agent'] });
        },
    });
};
