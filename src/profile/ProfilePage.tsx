import { useAuthStore } from "../features/auth/store/auth.store.ts";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar.tsx";
import type { Referral } from '../shared/types/types.ts';
import { useReferrals } from "../features/referrals/hooks/useReferrals.ts";

export const ProfilePage = () => {
    const user = useAuthStore((state) => state.user);

    const { data: referrals, isLoading } = useReferrals(user?.id);
    const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-600 font-medium">Cargando referidos...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gray-100 font-sans">
            <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
                <Sidebar
                    referrals={referrals?.data || []}
                    onSelect={setSelectedReferral}
                />
            </aside>

            <main className="flex-1 p-8">
                <header className="mb-8 border-b border-gray-200 pb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900">Panel de Control</h1>
                    <p className="text-gray-600 mt-2">Bienvenido de nuevo, <span className="font-semibold text-blue-600">{user?.name}</span></p>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Estadísticas Generales</h3>
                        <p className="text-gray-500 italic">Próximamente: Visualización de leads y conversiones.</p>
                    </div>

                    {selectedReferral && (
                        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100 animate-fade-in">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">Detalles del Referido</h3>
                            <p className="text-blue-900 font-medium">{selectedReferral.name}</p>
                            <p className="text-blue-700 text-sm">{selectedReferral.email}</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};