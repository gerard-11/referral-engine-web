import { useNavigate } from 'react-router-dom';

interface Agent {
    name: string;
    bio?: string;
    referralCode: string;
    avatarUrl?: string;
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
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200"
                    />
                ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 bg-gray-300 border-4 border-blue-200 flex items-center justify-center">
                        <span className="text-gray-600 text-sm">Sin foto</span>
                    </div>
                )}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{agent.name}</h2>
                {agent.bio && (
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-2">{agent.bio}</p>
                )}
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200 inline-block mb-3 sm:mb-4">
                    <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Código de Referral</p>
                    <code className="text-base sm:text-lg font-mono font-bold text-blue-600">{agent.referralCode}</code>
                </div>
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
        </div>
    );
};
