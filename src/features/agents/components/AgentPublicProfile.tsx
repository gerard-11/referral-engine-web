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
        <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
                {agent.avatarUrl ? (
                    <img
                        src={agent.avatarUrl}
                        alt={agent.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl mx-auto mb-4 object-cover border-4 border-blue-200"
                    />
                ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 bg-gray-300 border-4 border-blue-200 flex items-center justify-center">
                        <span className="text-gray-600 text-sm">Sin foto</span>
                    </div>
                )}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 capitalize">{agent.name}</h2>
                {agent.bio && (
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-2">{agent.bio}</p>
                )}
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
                {onSearchAnother && (
                    <button
                        onClick={onSearchAnother}
                        className="w-full px-4 sm:px-6 py-3 border-2 border-gray-300 hover:border-gray-400 active:bg-gray-50 text-gray-700 text-sm sm:text-base font-semibold rounded-lg transition-colors"
                    >
                        Buscar Otro
                    </button>
                )}
                <button
                    onClick={() => navigate('/register')}
                    className="w-full px-4 sm:px-6 py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors"
                >
                    Convertirme en Cliente
                </button>
            </div>

            {agent.reviewsReceived && agent.reviewsReceived.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Reseñas de Clientes</h3>
                    <ReviewsList reviews={agent.reviewsReceived} />
                </div>
            )}
        </div>
    );
};
