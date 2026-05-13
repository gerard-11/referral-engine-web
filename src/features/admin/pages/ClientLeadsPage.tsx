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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 capitalize">
                        Referidos de {decodeURIComponent(clientName || 'Cliente')}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Total: <span className="font-semibold">{clientLeads.length}</span> referidos
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() =>
                            navigate(`/admin/agents/${agentId}`)
                        }
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
