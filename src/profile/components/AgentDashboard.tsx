import type { Referral, User } from "../../shared/types/types";
import { useState } from "react";
import { QuestionsCRUD } from "../../features/questions/components/QuestionsCRUD";
import { LeadsTable } from "../../features/questions/components/LeadsTable";
import { LeadDetail } from "../../features/questions/components/LeadDetail";
import { useLeads } from "../../features/questions/hooks/useLeads";
import type { LeadResponse } from "../../features/questions/services/leads.service";

interface AgentDashboardProps {
    referrals: Referral[];
    onSelect: (referral: Referral) => void;
    selectedReferral: Referral | null;
    user?: User | null;
}

type TabType = "clients" | "questions" | "results"

export const AgentDashboard = ({ referrals }: AgentDashboardProps) => {

    const [activeTab, setActiveTab] = useState<TabType>("clients");
    const [selectedClient, setSelectedClient] = useState<Referral | null>(null);
    const [selectedLead, setSelectedLead] = useState<LeadResponse | null>(null);
    const { data: leadsData, isLoading: isLoadingLeads } = useLeads();

    const clientLeads = selectedClient
        ? leadsData?.data.filter(lead => lead.clientId === selectedClient.id) || []
        : [];



    return (
        <section className="space-y-6">
            <div className="flex gap-2 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("clients")}
                    className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                        activeTab === "clients"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                    }`}
                >
                    Mis Clientes
                </button>
                <button
                    onClick={() => setActiveTab("questions")}
                    className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                        activeTab === "questions"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                    }`}
                >
                    Mis Preguntas
                </button>
                <button
                    onClick={() => setActiveTab("results")}
                    className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                        activeTab === "results"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                    }`}
                >
                    Mis Resultados
                </button>
            </div>

            {activeTab === "clients" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Mis Clientes</h3>
                        <div className="space-y-2">
                            {referrals.length === 0 ? (
                                <p className="text-sm text-gray-500 italic">No hay clientes registrados.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {referrals.map((client) => (
                                        <li
                                            key={client.id}
                                            onClick={() => {
                                                setSelectedClient(client);
                                                setSelectedLead(null);
                                            }}
                                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                                selectedClient?.id === client.id
                                                    ? 'bg-blue-100 border-l-4 border-blue-600'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            <p className="text-sm font-medium text-gray-800">{client.name}</p>
                                            <p className="text-xs text-gray-500">{client.email}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">


                    {selectedClient && !selectedLead && (
                        <>
                            <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100 animate-fade-in">
                                <h3 className="text-lg font-semibold text-blue-800 mb-2">Detalles del Cliente</h3>
                                <div className="space-y-1">
                                    <p className="text-blue-900 font-bold text-xl">{selectedClient.name}</p>
                                    <p className="text-blue-700">{selectedClient.email}</p>
                                    <p className="text-blue-600 text-xs mt-2 italic">Registrado el: {new Date(selectedClient.createdAt).toLocaleDateString('es-ES')}</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Referidos del Cliente</h3>
                                {isLoadingLeads ? (
                                    <p className="text-center text-gray-500">Cargando referidos...</p>
                                ) : clientLeads.length === 0 ? (
                                    <p className="text-center text-gray-500 py-6">Este cliente no tiene referidos aún</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Nombre</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Teléfono</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Score</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Estado</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clientLeads.map((lead) => (
                                                    <tr key={lead.leadId} className="border-b border-gray-100 hover:bg-gray-50">
                                                        <td className="py-3 px-4 text-gray-800 font-medium">{lead.name}</td>
                                                        <td className="py-3 px-4 text-gray-600">{lead.email}</td>
                                                        <td className="py-3 px-4 text-gray-600">{lead.phone}</td>
                                                        <td className="py-3 px-4 text-gray-800 font-semibold">{lead.score}</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                lead.status === 'GREEN' ? 'bg-green-100 text-green-700' :
                                                                lead.status === 'YELLOW' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-red-100 text-red-700'
                                                            }`}>
                                                                {lead.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <button
                                                                onClick={() => setSelectedLead(lead)}
                                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                            >
                                                                Ver detalles
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {selectedLead && (
                        <div className="space-y-4">
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                            >
                                ← Volver a referidos
                            </button>
                            <LeadDetail lead={selectedLead} />
                        </div>
                    )}

                    {!selectedClient && (
                        <div className="bg-gray-50 p-12 rounded-xl border border-gray-200 text-center">
                            <p className="text-gray-500">Selecciona un cliente para ver sus referidos</p>
                        </div>
                    )}
                </div>
            </div>
            )}

            {activeTab === "questions" && (
                <QuestionsCRUD />
            )}

            {activeTab === "results" && (
                <LeadsTable leads={leadsData?.data || []} isLoading={isLoadingLeads} />
            )}
        </section>
    );
};
