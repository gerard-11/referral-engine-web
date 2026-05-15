import { useAuthStore } from '../store/auth.store.ts';
import {useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '../schemas/register.schema.ts';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register: registerAuth, isLoading, error: authError } = useAuthStore();
    
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: 'CLIENT',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            referralCode: '',
            agentCodeInput: '',
        }
    });

    const role = watch('role');

    const onSubmit = async (data: RegisterInput) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...payload } = data;
        await registerAuth(payload as any);
        navigate('/profile');
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-8 rounded-2xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Crear Cuenta
                </h2>

                <div className="mb-6">
                    <label className="block mb-2 font-medium text-gray-700">Tipo de Cuenta</label>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setValue('role', 'CLIENT')}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                                role === 'CLIENT'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Cliente
                        </button>
                        <button
                            type="button"
                            onClick={() => setValue('role', 'AGENT')}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                                role === 'AGENT'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Agente
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Nombre</label>
                    <input
                        type="text"
                        {...register('name')}
                        className={`w-full border rounded-lg px-3 py-2 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className={`w-full border rounded-lg px-3 py-2 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Contraseña</label>
                    <input
                        type="password"
                        {...register('password')}
                        className={`w-full border rounded-lg px-3 py-2 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Confirmar Contraseña</label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`w-full border rounded-lg px-3 py-2 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {role === 'CLIENT' && (
                    <div className="mb-4">
                        <label className="block mb-1">Código de Referido </label>
                        <input
                            type="text"
                            {...register('referralCode')}
                            placeholder="Ingresa el código que te compartio tu agente"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                )}

                {role === 'AGENT' && (
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">Código de Agente</label>
                        <input
                            type="text"
                            {...register('agentCodeInput')}
                            placeholder="Ej: FRNHBNRR"
                            className={`w-full border rounded-lg px-3 py-2 uppercase ${errors.agentCodeInput ? 'border-red-500' : ''}`}
                        />
                        {errors.agentCodeInput && <p className="text-red-500 text-xs mt-1">{errors.agentCodeInput.message}</p>}
                        <p className="text-xs text-gray-500 mt-1">Solicita este código a tu administrador</p>
                    </div>
                )}

                {authError && (
                    <p className="text-red-500 text-sm mb-4">{authError}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
                >
                    {isLoading ? 'Creando cuenta...' : 'Registrarse'}
                </button>
            </form>
        </div>
    );
};