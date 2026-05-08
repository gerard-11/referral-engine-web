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
        {role === 'AGENT' && (
            <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
                <Sidebar
                    referrals={referrals || []}
                    onSelect={setSelectedReferral}
                />
            </aside>
        )}

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
            </header>

            {role === 'AGENT' ? (
                <AgentDashboard 
                    referrals={referrals || []} 
                    onSelect={setSelectedReferral}
                    selectedReferral={selectedReferral}
                />
            ) : (
                <ClientDashboard />
            )}
        </main>
    </div>
);

};
