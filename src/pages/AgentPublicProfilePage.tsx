import { useNavigate, useParams } from 'react-router-dom';
import { useAgent } from '../features/agents/hooks/useAgent';
import { AgentPublicProfile } from '../features/agents/components/AgentPublicProfile';

export const AgentPublicProfilePage = () => {
    const navigate = useNavigate();
    const { agentCode } = useParams<{ agentCode: string }>();
    const { data: agent, isLoading, error } = useAgent(agentCode || null);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <p className="text-gray-600 text-lg">Cargando perfil del agente...</p>
            </div>
        );
    }

    if (error || !agent) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Agente no encontrado</h2>
                    <p className="text-gray-600 mb-6">El código "{agentCode}" no existe</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                    ← Volver al Inicio
                </button>

                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-semibold">Código de Referral</p>
                        <code className="text-2xl font-mono font-bold text-blue-600 block mb-4">{agent.referralCode}</code>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(agent.referralCode);
                                alert('Código copiado al portapapeles');
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                        >
                            Copiar Código
                        </button>
                    </div>

                    <AgentPublicProfile agent={agent} />
                </div>
            </div>
        </div>
    );
};
