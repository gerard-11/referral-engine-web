import { useNavigate, useParams } from 'react-router-dom';
import { useAgent } from '../features/agents/hooks/useAgent';

export const AgentProfilePage = () => {
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
                <div className="bg-blue-50 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
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

                <div className="bg-blue-50 p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{agent.name}</h1>
                        {agent.bio && (
                            <p className="text-gray-600 text-lg mb-6">{agent.bio}</p>
                        )}
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-semibold">Código para tu referido</p>
                        <code className="text-2xl font-mono font-bold text-blue-600 block mb-4">{agent.referralCode}</code>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(agent.referralCode);
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                        >
                            Copiar Código
                        </button>
                    </div>

                    <div className="flex gap-3 flex-col">
                        <button
                            onClick={() => navigate('/register')}
                            className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition-colors"
                        >
                            Convertirme en Cliente
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full px-6 py-4 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-semibold rounded-lg transition-colors"
                        >
                            Inicia Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
