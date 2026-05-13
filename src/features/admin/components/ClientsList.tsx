import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ClientForAdminDetail } from '../../../shared/types/types';
import type { LeadResponse } from '../../questions/services/leads.service';

interface ClientsListProps {
    clients: ClientForAdminDetail[];
    leads?: LeadResponse[];
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'GREEN':
            return 'bg-green-100 text-green-800';
        case 'YELLOW':
            return 'bg-yellow-100 text-yellow-800';
        case 'RED':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const ClientsList = ({ clients, leads = [] }: ClientsListProps) => {
    const { agentId } = useParams<{ agentId: string }>();
    const navigate = useNavigate();
    const [expandedClientId, setExpandedClientId] = useState<string | null>(null);

    const getClientLeads = (clientId: string) => {
        return leads.filter((lead) => lead.clientId === clientId);
    };

    if (clients.length === 0) {
        return (
            <div className="bg-white p-8 rounded-lg text-center text-gray-500">
                No hay clientes asignados
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {clients.map((client) => {
                const clientLeads = getClientLeads(client.id);
                const isExpanded = expandedClientId === client.id;

                return (
                    <div
                        key={client.id}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                    >
                        <button
                            onClick={() =>
                                setExpandedClientId(
                                    isExpanded ? null : client.id,
                                )
                            }
                            className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                        >
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">
                                    {client.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {client.email}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Creado:{' '}
                                    {new Date(client.createdAt).toLocaleDateString(
                                        'es-ES',
                                    )}
                                </p>
                            </div>
                            <div className="ml-4 flex items-center gap-3">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                    {clientLeads.length} referidos
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(
                                            `/admin/agents/${agentId}/clients/${client.id}/leads/${encodeURIComponent(client.name)}`,
                                        );
                                    }}
                                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded transition-colors"
                                >
                                    Ver todos
                                </button>
                                <div className="text-xl text-gray-400">
                                    {isExpanded ? '▼' : '▶'}
                                </div>
                            </div>
                        </button>


                        {isExpanded && (
                            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                                {clientLeads.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        Sin referidos
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {clientLeads.map((lead) => (
                                            <div
                                                key={lead.leadId}
                                                className="flex items-center justify-between p-2 bg-white rounded border border-gray-200"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm text-gray-900 truncate">
                                                        {lead.name}
                                                    </p>
                                                    <p className="text-xs text-gray-600 truncate">
                                                        {lead.email}
                                                    </p>
                                                </div>
                                                <div className="ml-3 flex items-center gap-2">
                                                    <span className="text-xs font-semibold text-gray-700">
                                                        Score: {lead.score}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(
                                                            lead.status,
                                                        )}`}
                                                    >
                                                        {lead.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
