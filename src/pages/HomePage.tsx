import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store/auth.store';
import { useAgent } from '../features/agents/hooks/useAgent';

export const HomePage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const user = useAuthStore((state) => state.user);
    const [agentCode, setAgentCode] = useState<string | null>(
        searchParams.get('agentCode')
    );
    const { data: agent, isLoading, error } = useAgent(agentCode);

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const handleSearch = (code: string) => {
        if (code.trim()) {
            setAgentCode(code);
        }
    };

    if (user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold text-gray-900">Referral Engine</h1>
                    <p className="text-xl text-gray-600">Conecta referidos con agentes de forma simple y efectiva</p>
                </div>

                {!agent ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Section 1: Buscar Agente */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Buscas un Agente?</h2>
                            <p className="text-gray-600 mb-6">Ingresa el código del agente para ver su perfil y ser un referido</p>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Código del agente"
                                    defaultValue={agentCode || ''}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch(e.currentTarget.value);
                                        }
                                    }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    onClick={(e) => {
                                        const input = (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement);
                                        handleSearch(input?.value || '');
                                    }}
                                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                >
                                    Buscar Agente
                                </button>
                            </div>
                        </div>

                        {/* Section 2: Crear Cuenta */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Eres Nuevo?</h2>
                            <p className="text-gray-600 mb-6">Crea tu cuenta para empezar a referir o gestionar referidos</p>

                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                                >
                                    Crear Cuenta
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full px-6 py-3 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-semibold rounded-lg transition-colors"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        {isLoading ? (
                            <p className="text-center text-gray-500">Cargando perfil...</p>
                        ) : error ? (
                            <div className="text-center">
                                <p className="text-red-600 mb-4">Agente no encontrado</p>
                                <button
                                    onClick={() => setAgentCode(null)}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Buscar otro agente
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{agent.name}</h2>
                                    {agent.bio && (
                                        <p className="text-gray-600 mb-4">{agent.bio}</p>
                                    )}
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 inline-block mb-4">
                                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Código de Referral</p>
                                        <code className="text-lg font-mono font-bold text-blue-600">{agent.referralCode}</code>
                                    </div>
                                </div>

                                <div className="flex gap-3 flex-col sm:flex-row">
                                    <button
                                        onClick={() => setAgentCode(null)}
                                        className="flex-1 px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors"
                                    >
                                        Buscar Otro
                                    </button>
                                    <button
                                        onClick={() => navigate('/register')}
                                        className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                                    >
                                        Convertirme en Cliente
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
