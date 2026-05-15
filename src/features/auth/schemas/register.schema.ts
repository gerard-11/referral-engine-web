import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string(),
    role: z.enum(['CLIENT', 'AGENT']),
    referralCode: z.string().optional(),
    agentCodeInput: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
}).refine((data) => {
    if (data.role === 'AGENT') {
        return !!data.agentCodeInput && data.agentCodeInput.length > 0;
    }
    return true;
}, {
    message: "El código de agente es obligatorio",
    path: ["agentCodeInput"],
});

export type RegisterInput = z.infer<typeof registerSchema>;
