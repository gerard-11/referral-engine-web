import { api } from '../../../shared/services/api';
import type { Review, CreateReviewRequest } from '../../../shared/types/types';

export const createReview = async (data: CreateReviewRequest): Promise<Review> => {
    const response = await api.post('/agents/reviews', data);
    return response.data;
};

export const toggleReviewVisibility = async (reviewId: string, isVisible: boolean): Promise<Review> => {
    const response = await api.patch(`/agents/reviews/${reviewId}/visibility`, { isVisible });
    return response.data;
};
