import {useAuthStore} from "../features/auth/store/auth.store.ts";
import {useEffect, useState} from "react";
import {Sidebar} from "./components/Sidebar.tsx";
import { useNavigate} from "react-router-dom";
import type {Referral, ReferralResponse} from '../shared/types/types.ts'
import {useReferrals} from "../features/referrals/hooks/useReferrals.ts";

export const ProfilePage = () => {
    const { user } = useAuthStore();
    const { data:response, isLoading } = useReferrals(user?.id) as { data: ReferralResponse | undefined, isLoading: boolean }
    const navigate = useNavigate();
    const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
console.log( selectedReferral );
console.log( 'response',response );
    useEffect(() => {
        if(user === null) {
            navigate('/');
        }
    }, [user]);

    if (user === null) {
        return null;
    }

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="min-h-screen flex bg-gray-100">

            <aside className="w-64 bg-white shadow-md">
                <Sidebar
                    referrals={response?.data || []}
                    onSelect={setSelectedReferral}
                />
            </aside>

            <main className="flex-1 p-6">
              <p>stats</p>
            </main>

        </div>
    );
};