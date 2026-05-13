import { useMutation } from '@tanstack/react-query';
import { createAdminUser } from '../services/admin.service';
import type { CreateAdminUserRequest } from '../../../shared/types/types';

export const useCreateAdminUser = () => {
    return useMutation({
        mutationFn: (data: CreateAdminUserRequest) => createAdminUser(data),
    });
};
