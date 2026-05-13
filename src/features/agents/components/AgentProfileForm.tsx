import { useState } from 'react';
import { useUpdateAgentProfile } from '../hooks/useUpdateAgentProfile';
import { api } from '../../../shared/services/api';
import * as React from "react";

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
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingImage(true);
        setUploadError(null);

        try {
            const formDataFile = new FormData();
            formDataFile.append('file', file);

            const response = await api.post('/agents/upload-avatar', formDataFile, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const { avatarUrl } = response.data;
            setFormData(prev => ({
                ...prev,
                avatarUrl,
            }));
        } catch (err) {
            setUploadError(err instanceof Error ? err.message : 'Error al subir imagen');
        } finally {
            setIsUploadingImage(false);
        }
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
        <form onSubmit={handleSubmit} className="space-y-4 bg-blue-50 p-6 rounded-lg shadow border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Editar Perfil</h3>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                    {error instanceof Error ? error.message : 'Error al actualizar perfil'}
                </div>
            )}

            {isSuccess && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded text-sm">
                    Perfil actualizado exitosamente
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Foto de Perfil</label>
                {formData.avatarUrl && (
                    <div className="mb-3">
                        <img
                            src={formData.avatarUrl}
                            alt="Avatar preview"
                            className="w-24 h-24 rounded-lg object-cover border border-blue-300 bg-blue-50"
                        />
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    className="w-full px-3 py-2 border border-blue-300 rounded bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {isUploadingImage && <p className="text-sm text-blue-500 mt-1">Subiendo imagen...</p>}
                {uploadError && <p className="text-sm text-red-600 mt-1">{uploadError}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-300 rounded bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Bio</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-blue-300 rounded bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Cuéntanos sobre ti"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Avatar URL</label>
                <input
                    type="url"
                    name="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-300 rounded bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Teléfono</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-300 rounded bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 234 567 8900"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium rounded transition-colors"
            >
                {isPending ? 'Guardando...' : 'Guardar cambios'}
            </button>
        </form>
    );
};
