import { useState } from 'react';
import { useAdminAgents, useCreateAgentCode } from '../hooks';
import { AgentsList } from '../components/AgentsList';
import { CreateAdminForm } from '../components/CreateAdminForm';

export const AdminDashboard = () => {
    const { data: agents, isLoading, error } = useAdminAgents();
    const { mutate: createCode, isPending: isCreatingCode } = useCreateAgentCode();
    const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);

    const handleCreateAgentCode = async () => {
        createCode(undefined, {
            onSuccess: (data) => {
                setGeneratedCode(data.code);
                setTimeout(() => setGeneratedCode(null), 3000);
            },
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-600">Cargando agentes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-lg text-red-700">
                Error al cargar agentes. Intenta nuevamente.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Gestión de Agentes</h2>
                <div className="flex gap-3">
                    <button
                        onClick={handleCreateAgentCode}
                        disabled={isCreatingCode}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:bg-gray-400 transition-colors"
                    >
                        {isCreatingCode ? 'Generando...' : '+ Generar Código'}
                    </button>
                    <button
                        onClick={() => setShowCreateAdminModal(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        + Crear Admin
                    </button>
                </div>
            </div>

            {generatedCode && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-green-800 font-semibold">Código generado</p>
                        <code className="text-lg font-mono text-green-700">{generatedCode}</code>
                    </div>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(generatedCode);
                        }}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                    >
                        Copiar
                    </button>
                </div>
            )}

            <AgentsList agents={agents || []} />


            {showCreateAdminModal && (
                <CreateAdminForm
                    onClose={() => setShowCreateAdminModal(false)}
                />
            )}
        </div>
    );
};
