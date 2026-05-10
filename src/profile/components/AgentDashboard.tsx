import type { Referral, User } from "../../shared/types/types";
import { useState } from "react";
import { QuestionsCRUD } from "../../features/questions/components/QuestionsCRUD";
import { LeadsTable } from "../../features/questions/components/LeadsTable";
import { useLeads } from "../../features/questions/hooks/useLeads";

interface AgentDashboardProps {
    referrals: Referral[];
    onSelect: (referral: Referral) => void;
    selectedReferral: Referral | null;
    user?: User;
}

type TabType = "network" | "questions" | "results"

export const AgentDashboard = ({ referrals, onSelect, selectedReferral, user }: AgentDashboardProps) => {
    const recentReferrals = referrals.slice(0, 5);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>("network");
    const { data: leadsData, isLoading: isLoadingLeads } = useLeads();

    const handleCopyCode = () => {
        if (user?.referralCode) {
            navigator.clipboard.writeText(user.referralCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section className="space-y-6">
            <div className="flex gap-2 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("network")}
                    className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                        activeTab === "network"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                    }`}
                >
                    Mi Red
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

            {activeTab === "network" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Métricas de Red</h3>
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">Total Referidos</p>
                            <p className="text-3xl font-bold text-gray-900">{referrals.length}</p>
                        </div>
                    </div>
                    {user?.referralCode && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-xs text-gray-600 uppercase tracking-wider mb-2">Tu Código de Referral</p>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 bg-white px-3 py-2 rounded text-sm font-mono font-bold text-blue-600 border border-blue-100">
                                    {user.referralCode}
                                </code>
                                <button
                                    onClick={handleCopyCode}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors"
                                >
                                    {copied ? '✓ Copiado' : 'Copiar'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Referidos Recientes</h3>
                    <ul className="divide-y divide-gray-100">
                        {recentReferrals.map((ref) => (
                            <li 
                                key={ref.id} 
                                onClick={() => onSelect(ref)}
                                className="py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors px-2 rounded-lg"
                            >
                                <span className="text-sm font-medium text-gray-800">{ref.name}</span>
                                <span className="text-xs text-gray-400">{new Date(ref.createdAt).toLocaleDateString()}</span>
                            </li>
                        ))}
                        {referrals.length === 0 && (
                            <p className="text-sm text-gray-500 italic">No hay referidos registrados.</p>
                        )}
                    </ul>
                </div>
            </div>
...

            {selectedReferral && (
                <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100 animate-fade-in">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Detalles del Referido</h3>
                    <div className="space-y-1">
                        <p className="text-blue-900 font-bold text-xl">{selectedReferral.name}</p>
                        <p className="text-blue-700">{selectedReferral.email}</p>
                        <p className="text-blue-600 text-xs mt-2 italic text-right">Registrado el: {new Date(selectedReferral.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            )}
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
