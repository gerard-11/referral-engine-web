import { useAuthStore } from "../features/auth/store/auth.store.ts";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar.tsx";
import type { Referral } from '../shared/types/types.ts';
import { useReferrals } from "../features/referrals/hooks/useReferrals.ts";
import { AgentDashboard } from "./components/AgentDashboard.tsx";
import { ClientDashboard } from "./components/ClientDashboard.tsx";

export const ProfilePage = () => {
    const user = useAuthStore((state) => state.user);
    const role = user?.role;
    const { data: referrals, isLoading } = useReferrals(user?.id);
    const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        if (user?.referralCode) {
            navigator.clipboard.writeText(user.referralCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-600 font-medium">Cargando datos...</p>
            </div>
        );
    }
return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
        <main className="flex-1 p-8">
            <header className="mb-8 border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-extrabold text-gray-900">
                    {role === 'AGENT' ? 'Panel de Agente' : 'Mi Perfil de Recompensas'}
                </h1>
                <p className="text-gray-600 mt-2">
                    Bienvenido, <span className="font-semibold text-blue-600">{user?.name}</span> 
                    <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full uppercase tracking-wider font-bold">
                        {role}
                    </span>
                </p>

                    <div className="bg-blue-50 p-6 rounded-xl w-65 shadow-sm border mt-2 border-blue-200">
                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-3 font-semibold">Tu Código de Referral</p>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 bg-white px-3 py-2 rounded text-sm font-mono font-bold text-blue-600 border border-blue-100">
                                {user?.referralCode}
                            </code>
                            <button
                                onClick={handleCopyCode}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors whitespace-nowrap"
                            >
                                {copied ? '✓ Copiado' : 'Copiar'}
                            </button>
                        </div>
                    </div>

            </header>

            {role === 'AGENT' ? (
                <AgentDashboard
                    referrals={referrals || []}
                    onSelect={setSelectedReferral}
                    selectedReferral={selectedReferral}
                    user={user}
                />
            ) : (
                <ClientDashboard />
            )}
        </main>
    </div>
);

};
