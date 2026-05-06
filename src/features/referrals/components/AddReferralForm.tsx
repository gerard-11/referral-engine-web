import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const referralSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Introduce un email válido'),
});

type ReferralFormData = z.infer<typeof referralSchema>;

interface AddReferralFormProps {
  onSubmit: (data: ReferralFormData) => void;
  isLoading: boolean;
}


export const AddReferralForm = ({ onSubmit, isLoading }: AddReferralFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Nombre del Referido</label>
            <input
                {...register('name')}
                autoFocus
                className={`w-full p-3 rounded-xl border transition-all outline-none focus:ring-2 ${
                    errors.name 
                    ? 'border-red-300 focus:ring-red-100' 
                    : 'border-gray-200 focus:ring-blue-100 focus:border-blue-400'
                }`}
                placeholder="Nombre completo"
            />
            {errors.name && <p className="text-xs text-red-500 font-medium pl-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Correo Electrónico</label>
            <input
                {...register('email')}
                type="email"
                className={`w-full p-3 rounded-xl border transition-all outline-none focus:ring-2 ${
                    errors.email 
                    ? 'border-red-300 focus:ring-red-100' 
                    : 'border-gray-200 focus:ring-blue-100 focus:border-blue-400'
                }`}
                placeholder="correo@ejemplo.com"
            />
            {errors.email && <p className="text-xs text-red-500 font-medium pl-1">{errors.email.message}</p>}
        </div>

        <div className="pt-2">
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:bg-blue-300 disabled:shadow-none"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Guardando...
                    </span>
                ) : 'Siguiente: Iniciar Encuesta'}
            </button>
        </div>
    </form>
  );
};
