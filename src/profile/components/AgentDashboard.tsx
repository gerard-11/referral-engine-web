import type { Referral } from "../../shared/types/types";

interface AgentDashboardProps {
    referrals: Referral[];
    onSelect: (referral: Referral) => void;
    selectedReferral: Referral | null;
}

export const AgentDashboard = ({ referrals, onSelect, selectedReferral }: AgentDashboardProps) => {
    const recentReferrals = referrals.slice(0, 5);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Métricas de Red</h3>
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">Total Referidos</p>
                            <p className="text-3xl font-bold text-gray-900">{referrals.length}</p>
                        </div>
                    </div>
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
        </section>
    );
};
