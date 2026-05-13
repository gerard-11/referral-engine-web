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
            <div className="bg-white p-6 md:p-8 rounded-lg text-center text-gray-500 text-sm md:text-base">
                No hay clientes asignados
            </div>
        );
    }

    return (
        <div className="space-y-3  w-full md:px-0">
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
                            className="w-full text-left p-3 md:p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-2 md:gap-3"
                        >
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 text-sm md:text-base capitalize truncate">
                                    {client.name}
                                </h4>
                                <p className="text-xs md:text-sm text-gray-600 truncate hidden md:block">
                                    {client.email}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 hidden md:block">
                                    Creado:{' '}
                                    {new Date(client.createdAt).toLocaleDateString(
                                        'es-ES',
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="hidden md:inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                    {clientLeads.length} referidos
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(
                                            `/admin/agents/${agentId}/clients/${client.id}/leads/${encodeURIComponent(client.name)}`,
                                        );
                                    }}
                                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm font-semibold rounded transition-colors"
                                >
                                    Ver todos
                                </button>
                                <div className="text-lg md:text-xl text-gray-400">
                                    {isExpanded ? '▼' : '▶'}
                                </div>
                            </div>
                        </button>


                        {isExpanded && (
                            <div className="bg-gray-50 px-3 md:px-4 py-2 md:py-3 border-t border-gray-200">
                                {clientLeads.length === 0 ? (
                                    <p className="text-xs md:text-sm text-gray-500">
                                        Sin referidos
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {clientLeads.map((lead) => (
                                            <div
                                                key={lead.leadId}
                                                className="flex flex-col md:flex-row md:items-center md:justify-between p-2 md:p-3 bg-white rounded border border-gray-200 gap-1 md:gap-0"
                                            >
                                                <div className="flex-1 min-w-0 order-first">
                                                    <p className="font-medium text-sm text-gray-900">
                                                        {lead.name}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {lead.email}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 md:ml-3 order-last md:order-none flex-wrap">
                                                    <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                                                        Score: {lead.score}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${getStatusColor(
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
