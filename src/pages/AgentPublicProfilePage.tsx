import { useNavigate, useParams } from 'react-router-dom';
import { useAgent } from '../features/agents/hooks/useAgent';
import { AgentPublicProfile } from '../features/agents/components/AgentPublicProfile';

export const AgentPublicProfilePage = () => {
    const navigate = useNavigate();
    const { agentCode } = useParams<{ agentCode: string }>();
    const { data: agent, isLoading, error } = useAgent(agentCode || null);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-blue-800 text-lg font-medium">Cargando perfil del agente...</p>
                </div>
            </div>
        );
    }

    if (error || !agent) {
        return (
            <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow max-w-md w-full text-center border border-blue-200">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Agente no encontrado</h2>
                    <p className="text-blue-700 mb-6">El código "{agentCode}" no existe</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
                    >
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-100 py-8 sm:py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 text-blue-700 hover:text-blue-900 font-medium flex items-center gap-1 text-sm hover:gap-2 transition-all"
                >
                    ← Volver
                </button>

                <div className="bg-blue-50 p-6 sm:p-8 rounded-xl shadow-lg border border-blue-200">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 sm:p-8 rounded-xl mb-8 text-white shadow-md">
                        <p className="text-xs uppercase tracking-widest mb-3 font-bold opacity-90">Código de Referral</p>
                        <code className="text-2xl sm:text-3xl font-mono font-bold block mb-6 break-all bg-blue-900 bg-opacity-30 p-4 rounded-lg">{agent.referralCode}</code>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(agent.referralCode);
                                alert('✓ Código copiado');
                            }}
                            className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-700 text-sm sm:text-base font-semibold rounded-lg transition-colors shadow-sm"
                        >
                            Copiar Código
                        </button>
                    </div>

                    <div className="border-t-2 border-blue-200 mb-8 pt-8">
                        <AgentPublicProfile agent={agent} />
                    </div>
                </div>
            </div>
        </div>
    );
};
