import { useState } from "react";
import { useAuthStore } from "../../features/auth/store/auth.store";
import { Modal } from "../../shared/components/Modal";
import { AddReferralForm } from "../../features/referrals/components/AddReferralForm";

export const ClientDashboard = () => {
    const user = useAuthStore((state) => state.user);
    const greenLeads = user?.clientScore?.greenLeads || 0;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleFormSubmit = (data: any) => {
        console.log("Datos del referido:", data);
        setTimeout(() => {
            handleCloseModal();
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white">
                    <h3 className="text-lg font-medium opacity-90">Tus Recompensas</h3>
                    <div className="mt-4 flex items-baseline">
                        <p className="text-5xl font-extrabold">{greenLeads}</p>
                        <p className="ml-2 text-green-100">Referidos Verdes</p>
                    </div>
                    <p className="mt-4 text-sm bg-white/20 p-2 rounded-lg inline-block">
                        ¡Sigue así para desbloquear el siguiente nivel!
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">¿Tienes un nuevo referido?</h3>
                    <p className="text-gray-500 mb-6 text-sm">Completa la encuesta para calificar a tu referido y ganar puntos.</p>
                    <button 
                        onClick={handleOpenModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-md"
                    >
                        + Agregar Referido
                    </button>
                </div>
            </section>

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                title="Registrar Nuevo Referido"
            >
                <AddReferralForm 
                    onSubmit={handleFormSubmit} 
                    isLoading={false} 
                />
            </Modal>
        </div>
    );
};
