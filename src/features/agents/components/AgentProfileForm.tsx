import { useState } from 'react';
import { useUpdateAgentProfile } from '../hooks/useUpdateAgentProfile';

interface Agent {
    name: string;
    bio?: string;
    avatarUrl?: string;
    phoneNumber?: string;
}

interface AgentProfileFormProps {
    agent: Agent;
}

export const AgentProfileForm = ({ agent }: AgentProfileFormProps) => {
    const { mutate, isPending, error, isSuccess } = useUpdateAgentProfile();
    const [formData, setFormData] = useState({
        name: agent.name || '',
        bio: agent.bio || '',
        avatarUrl: agent.avatarUrl || '',
        phoneNumber: agent.phoneNumber || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({
            name: formData.name,
            bio: formData.bio || undefined,
            avatarUrl: formData.avatarUrl || undefined,
            phoneNumber: formData.phoneNumber || undefined,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar Perfil</h3>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error instanceof Error ? error.message : 'Error al actualizar perfil'}
                </div>
            )}

            {isSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    Perfil actualizado exitosamente
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Cuéntanos sobre ti"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                <input
                    type="url"
                    name="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 234 567 8900"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
            >
                {isPending ? 'Guardando...' : 'Guardar cambios'}
            </button>
        </form>
    );
};
