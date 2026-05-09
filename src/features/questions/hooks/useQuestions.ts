import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQuestions, createQuestion, updateQuestion, deleteQuestion } from "../services/questions.service";

export const useQuestions = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["questions"],
        queryFn: () => getQuestions(),
    });

    const createMutation = useMutation({
        mutationFn: (data: { text: string; weight: number }) => createQuestion(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: { text: string; weight: number; isActive: boolean } }) =>
            updateQuestion(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteQuestion(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });

    return {
        ...query,
        createMutation,
        updateMutation,
        deleteMutation,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};
