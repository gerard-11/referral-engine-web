import { useMutation } from '@tanstack/react-query';
import { createLead, type LeadInput } from '../services/leads.service';

export const useLead = () => {
    const mutation = useMutation({
        mutationFn: (data: LeadInput) => createLead(data),
    });

    return {
        ...mutation,
        isLoading: mutation.isPending,
    };
};
