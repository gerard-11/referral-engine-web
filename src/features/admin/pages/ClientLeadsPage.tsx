import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLeads } from '../../questions/hooks/useLeads';
import { LeadsTable } from '../../questions/components/LeadsTable';
import { LeadDetail } from '../../questions/components/LeadDetail';
import type { LeadResponse } from '../../questions/services/leads.service';

export const ClientLeadsPage = () => {
    const { agentId, clientId, clientName } = useParams<{
        agentId: string;
        clientId: string;
        clientName: string;
    }>();
    const navigate = useNavigate();
    const [selectedLead, setSelectedLead] = useState<LeadResponse | null>(null);

    const { data: leadsData, isLoading } = useLeads();

    const clientLeads =
        clientId && leadsData?.data
            ? leadsData.data.filter((lead) => lead.clientId === clientId)
            : [];

    return (
        <div className="space-y-4 md:space-y-6 px-4 md:px-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                        Referidos de {decodeURIComponent(clientName || 'Cliente')}
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                        Total: <span className="font-semibold">{clientLeads.length}</span> referidos
                    </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={() =>
                            navigate(`/admin/agents/${agentId}`)
                        }
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base flex-1 md:flex-none"
                    >
                        ← Volver
                    </button>
                </div>
            </div>

            {selectedLead ? (
                <div className="space-y-4">
                    <button
                        onClick={() => setSelectedLead(null)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                    >
                        ← Volver a referidos
                    </button>
                    <LeadDetail lead={selectedLead} />
                </div>
            ) : (
                <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-gray-100">
                    <LeadsTable
                        leads={clientLeads}
                        isLoading={isLoading}
                        onSelectLead={setSelectedLead}
                        title={`Referidos de ${decodeURIComponent(clientName || 'Cliente')}`}
                        showWrapper={false}
                    />
                </div>
            )}
        </div>
    );
};
