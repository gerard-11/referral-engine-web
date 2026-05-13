import { useParams, useNavigate } from 'react-router-dom';
import { useAgentDetail } from '../hooks';
import { useLeads } from '../../questions/hooks/useLeads';
import { ClientsList } from '../components/ClientsList';

export const AgentDetailPage = () => {
    const { agentId } = useParams<{ agentId: string }>();
    const navigate = useNavigate();
    const { data: agent, isLoading, error } = useAgentDetail(agentId || null);
    const { data: leadsData } = useLeads();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-600">Cargando detalle...</p>
            </div>
        );
    }

    if (error || !agent) {
        return (
            <div className="bg-red-50 p-4 rounded-lg text-red-700">
                <p>Error al cargar el agente</p>
                <button
                    onClick={() => navigate('/admin')}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Volver
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4 md:space-y-6 px-4 md:px-0">

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                        {agent.name}
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">{agent.email}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                agent.isActive
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {agent.isActive ? 'ACTIVO' : 'INACTIVO'}
                        </span>
                        <span className="text-sm text-gray-600">
                            Creado:{' '}
                            {new Date(agent.createdAt).toLocaleDateString(
                                'es-ES',
                            )}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/admin')}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base w-full md:w-auto"
                >
                    ← Volver
                </button>
            </div>


            {!agent.isActive && agent.deactivationReason && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                        <strong>Razón de desactivación:</strong>{' '}
                        {agent.deactivationReason}
                    </p>
                    {agent.deactivatedAt && (
                        <p className="text-xs text-yellow-700 mt-1">
                            {new Date(agent.deactivatedAt).toLocaleString(
                                'es-ES',
                            )}
                        </p>
                    )}
                </div>
            )}

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Clientes y Referidos
                </h3>
                <ClientsList clients={agent.clients} leads={leadsData?.data || []} />
            </div>
        </div>
    );
};
