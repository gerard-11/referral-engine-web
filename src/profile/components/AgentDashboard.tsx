import type { Referral, User } from "../../shared/types/types";
import { useState } from "react";
import { QuestionsCRUD } from "../../features/questions/components/QuestionsCRUD";
import { LeadsTable } from "../../features/questions/components/LeadsTable";
import { LeadDetail } from "../../features/questions/components/LeadDetail";
import { useLeads } from "../../features/questions/hooks/useLeads";
import type { LeadResponse } from "../../features/questions/services/leads.service";
import { useAgent } from "../../features/agents/hooks/useAgent";
import { AgentProfileForm } from "../../features/agents/components/AgentProfileForm";


interface AgentDashboardProps {
    referrals: Referral[];
    onSelect: (referral: Referral) => void;
    selectedReferral: Referral | null;
    user?: User | null;
}

type TabType = "clients" | "questions" | "results" | "profile"

export const AgentDashboard = ({ referrals, user }: AgentDashboardProps) => {
 
    const [activeTab, setActiveTab] = useState<TabType>("clients");
    const [selectedClient, setSelectedClient] = useState<Referral | null>(null);
    const [selectedLead, setSelectedLead] = useState<LeadResponse | null>(null);
    const { data: leadsData, isLoading: isLoadingLeads } = useLeads();
    const agentCode = user?.agentCode ?? null;
    const { data: agent } = useAgent(agentCode);
    const clientLeads = selectedClient
        ? leadsData?.data.filter(lead => lead.clientId === selectedClient.id) || []
        : [];

    return (
        <section className="space-y-4 md:space-y-6">
            <div className="flex gap-1 md:gap-2 border-b border-gray-200 overflow-x-auto">
                <button
                    onClick={() => setActiveTab("clients")}
                    className={`px-2 md:px-4 py-2 md:py-3 font-medium border-b-2 transition-colors text-xs md:text-sm whitespace-nowrap ${
                        activeTab === "clients"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                    }`}
                >
                    Mis Clientes
                </button>
                <button
                    onClick={() => setActiveTab("questions")}
                    className={`px-2 md:px-4 py-2 md:py-3 font-medium border-b-2 transition-colors text-xs md:text-sm whitespace-nowrap ${
                        activeTab === "questions"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                    }`}
                >
                    Mis Preguntas
                </button>
                <button
                    onClick={() => setActiveTab("results")}
                    className={`px-2 md:px-4 py-2 md:py-3 font-medium border-b-2 transition-colors text-xs md:text-sm whitespace-nowrap ${
                        activeTab === "results"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                    }`}
                >
                    Mis Resultados
                </button>
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`px-2 md:px-4 py-2 md:py-3 font-medium border-b-2 transition-colors text-xs md:text-sm whitespace-nowrap ${
                        activeTab === "profile"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                    }`}
                >
                    Mi Perfil
                </button>
            </div>

            {activeTab === "clients" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="md:col-span-1">
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
                        <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-4">Mis Clientes</h3>
                        <div className="space-y-2">
                            {referrals.length === 0 ? (
                                <p className="text-xs md:text-sm text-gray-500 italic">No hay clientes registrados.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {referrals.map((client) => (
                                        <li
                                            key={client.id}
                                            onClick={() => {
                                                setSelectedClient(client);
                                                setSelectedLead(null);
                                            }}
                                            className={`p-2 md:p-3 rounded-lg cursor-pointer transition-colors ${
                                                selectedClient?.id === client.id
                                                    ? 'bg-blue-100 border-l-4 border-blue-600'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            <p className="text-xs md:text-sm font-medium text-gray-800 truncate">{client.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{client.email}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-4 md:space-y-6">


                    {selectedClient && !selectedLead && (
                        <>
                            <div className="bg-blue-50 p-4 md:p-6 rounded-xl shadow-sm border border-blue-100 animate-fade-in">
                                <h3 className="text-base md:text-lg font-semibold text-blue-800 mb-2">Detalles del Cliente</h3>
                                <div className="space-y-1">
                                    <p className="text-blue-900 font-bold text-lg md:text-xl capitalize">{selectedClient.name}</p>
                                    <p className="text-blue-700 text-sm md:text-base">{selectedClient.email}</p>
                                    <p className="text-blue-600 text-xs mt-2 italic">Registrado el: {new Date(selectedClient.createdAt).toLocaleDateString('es-ES')}</p>
                                </div>
                            </div>

                            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
                                <LeadsTable
                                    leads={clientLeads}
                                    isLoading={isLoadingLeads}
                                    onSelectLead={setSelectedLead}
                                    title="Referidos del Cliente"
                                    showWrapper={false}
                                />
                            </div>
                        </>
                    )}

                    {selectedLead && (
                        <div className="space-y-4">
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="text-blue-600 hover:text-blue-800 text-xs md:text-sm font-medium flex items-center gap-1"
                            >
                                ← Volver a referidos
                            </button>
                            <LeadDetail lead={selectedLead} />
                        </div>
                    )}

                    {!selectedClient && (
                        <div className="bg-gray-50 p-8 md:p-12 rounded-xl border border-gray-200 text-center">
                            <p className="text-sm md:text-base text-gray-500">Selecciona un cliente para ver sus referidos</p>
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

            {activeTab === "profile" && agent && (
                <div className="max-w-2xl space-y-4 md:space-y-6">
                    {agentCode && (
                        <div className="bg-blue-50 p-4 md:p-6 rounded-lg border border-blue-200 w-full md:max-w-60">
                            <p className="text-xs md:text-sm text-gray-600 mb-3">
                                Comparte este código para que puedan ver tu perfil público:
                            </p>
                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
                                <code className="flex-1 px-3 py-2 md:py-1 bg-white border border-blue-300 rounded text-xs md:text-sm font-mono font-bold text-blue-600 text-center">
                                    {agentCode}
                                </code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(agentCode);
                                        alert('Código copiado');
                                    }}
                                    className="px-3 py-2 md:py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors text-xs md:text-sm whitespace-nowrap"
                                >
                                    Copiar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Editar Perfil */}
                    <div>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4">Editar Perfil</h3>
                        <AgentProfileForm agent={agent} />
                    </div>
                </div>
            )}
        </section>
    );
};
