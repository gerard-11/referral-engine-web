import { useQuery } from '@tanstack/react-query';
import { getAdminAgents } from '../services/admin.service';

export const useAdminAgents = () => {
    return useQuery({
        queryKey: ['adminAgents'],
        queryFn: getAdminAgents,
    });
};
