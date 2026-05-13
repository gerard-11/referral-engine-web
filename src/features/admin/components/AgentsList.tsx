import { useNavigate } from 'react-router-dom';
import type { AgentForAdminList } from '../../../shared/types/types';
import { AgentActionsDropdown } from './AgentActionsDropdown';

interface AgentsListProps {
    agents: AgentForAdminList[];
}

export const AgentsList = ({ agents }: AgentsListProps) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm md:text-base">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Creado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {agents.map((agent) => (
                        <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                <button
                                    onClick={() => navigate(`/admin/agents/${agent.id}`)}
                                    className="text-blue-600 hover:text-blue-700 underline capitalize"
                                >
                                    {agent.name}
                                </button>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{agent.email}</td>
                            <td className="px-6 py-4 text-sm">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        agent.isActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {agent.isActive ? 'ACTIVO' : 'INACTIVO'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                {new Date(agent.createdAt).toLocaleDateString('es-ES')}
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <AgentActionsDropdown agentId={agent.id} isActive={agent.isActive} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {agents.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                    No hay agentes registrados
                </div>
            )}
        </div>
    );
};
