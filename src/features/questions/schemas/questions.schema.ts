import { z } from 'zod';

export const questionSchema = z.object({
    text: z.string().min(9, 'La pregunta debe tener al menos 9 caracteres').max(255, 'Máximo 255 caracteres'),
    weight: z.number().int('El peso debe ser un número entero').min(1, 'El peso debe ser al menos 1').max(100, 'El peso máximo es 100'),
    isActive:z.boolean()
});

export type QuestionInput = z.infer<typeof questionSchema>;
