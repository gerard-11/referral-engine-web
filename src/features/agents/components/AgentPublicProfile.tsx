import { useNavigate } from 'react-router-dom';
import { ReviewsList } from './ReviewsList';
import type { ReviewReceived } from '../../../shared/types/types';

interface Agent {
    name: string;
    bio?: string;
    referralCode: string;
    avatarUrl?: string;
    reviewsReceived?: ReviewReceived[];
}

interface AgentPublicProfileProps {
    agent: Agent;
    onSearchAnother?: () => void;
}

export const AgentPublicProfile = ({ agent, onSearchAnother }: AgentPublicProfileProps) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
                {agent.avatarUrl ? (
                    <img
                        src={agent.avatarUrl}
                        alt={agent.name}
                        className="w-28 h-28 sm:w-40 sm:h-40 rounded-xl mx-auto mb-6 object-cover border-4 border-blue-300 shadow-lg"
                    />
                ) : (
                    <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-xl mx-auto mb-6 bg-blue-200 border-4 border-blue-300 flex items-center justify-center shadow-lg">
                        <span className="text-blue-600 text-sm font-medium">Sin foto</span>
                    </div>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-3 capitalize">{agent.name}</h1>
                {agent.bio && (
                    <p className="text-sm sm:text-base text-blue-700 mb-6 sm:mb-8 px-2 max-w-md mx-auto leading-relaxed">{agent.bio}</p>
                )}
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
                {onSearchAnother && (
                    <button
                        onClick={onSearchAnother}
                        className="w-full px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 hover:bg-blue-50 active:bg-blue-100 text-blue-700 text-sm sm:text-base font-semibold rounded-lg transition-colors"
                    >
                        Buscar Otro Agente
                    </button>
                )}
                <button
                    onClick={() => navigate('/register')}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                    Convertirme en Cliente
                </button>
            </div>

            {agent.reviewsReceived && agent.reviewsReceived.length > 0 && (
                <div className="mt-8 sm:mt-10 pt-8 border-t-2 border-blue-200">
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">Testimonios de Clientes</h2>
                    <ReviewsList reviews={agent.reviewsReceived} />
                </div>
            )}
        </div>
    );
};
