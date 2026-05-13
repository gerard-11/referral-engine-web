import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store/auth.store';
import { useAgent } from '../features/agents/hooks/useAgent';
import { AgentPublicProfile } from '../features/agents/components/AgentPublicProfile';

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8 sm:p-4">
            <div className="w-full max-w-4xl space-y-6 sm:space-y-8 md:space-y-12">

                <div className="text-center space-y-2 sm:space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Referix App</h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">Conecta referidos con agentes de forma simple y efectiva</p>
                </div>

                {!agent ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">

                        <div className="bg-blue-50 p-5 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">¿Buscas un Agente?</h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Ingresa el código del agente para ver su perfil y ser un referido</p>

                            <div className="space-y-3 sm:space-y-4">
                                <input
                                    type="text"
                                    placeholder="Código del agente"
                                    defaultValue={agentCode || ''}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch(e.currentTarget.value);
                                        }
                                    }}
                                    className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    onClick={(e) => {
                                        const input = (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement);
                                        handleSearch(input?.value || '');
                                    }}
                                    className="w-full px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors"
                                >
                                    Buscar Agente
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-5 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">¿Eres Nuevo?</h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Crea tu cuenta para empezar a referir o gestionar referidos</p>

                            <div className="space-y-2 sm:space-y-3">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="w-full px-4 sm:px-6 py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors"
                                >
                                    Crear Cuenta
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full px-4 sm:px-6 py-3 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 active:bg-gray-50 text-gray-700 text-sm sm:text-base font-semibold rounded-lg transition-colors"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-blue-50 p-5 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-lg border border-gray-100">
                        {isLoading ? (
                            <p className="text-center text-gray-500 text-sm sm:text-base">Cargando perfil...</p>
                        ) : error ? (
                            <div className="text-center">
                                <p className="text-red-600 mb-3 sm:mb-4 text-sm sm:text-base">Agente no encontrado</p>
                                <button
                                    onClick={() => setAgentCode(null)}
                                    className="text-blue-600 hover:text-blue-800 active:text-blue-900 font-medium text-sm sm:text-base"
                                >
                                    Buscar otro agente
                                </button>
                            </div>
                        ) : (
                            <AgentPublicProfile
                                agent={agent}
                                onSearchAnother={() => setAgentCode(null)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
