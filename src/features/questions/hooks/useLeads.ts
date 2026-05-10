import { useQuery } from '@tanstack/react-query';
import { getAgentLeads, type LeadsResponse } from '../services/leads.service';

export const useLeads = () => {
    return useQuery<LeadsResponse>({
        queryKey: ['leads'],
        queryFn: getAgentLeads,
    });
};
