import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLead, type LeadInput } from '../services/leads.service';

export const useLead = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: LeadInput) => createLead(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientLeads"] });
        },
    });

    return {
        ...mutation,
        isLoading: mutation.isPending,
    };
};
