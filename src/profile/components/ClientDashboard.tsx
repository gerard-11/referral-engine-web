import { useState } from "react";
import { useAuthStore } from "../../features/auth/store/auth.store";
import { Modal } from "../../shared/components/Modal";
import { AddReferralForm } from "../../features/referrals/components/AddReferralForm";
import { useAgentQuestions } from "../../features/questions/hooks/useAgentQuestions";
import { QuestionsForm } from "../../features/questions/components/QuestionsForm";
import { useLead } from "../../features/questions/hooks/useLead";
import { useClientLeads } from "../../features/questions/hooks/useClientLeads";
import type { LeadInput } from "../../features/questions/services/leads.service";

export const ClientDashboard = () => {
    const user = useAuthStore((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [referralData, setReferralData] = useState<{ name: string; email: string; phone: string } | null>(null);

    const { data: questions = [] } = useAgentQuestions(user?.agent?.id);
    const { mutate: createLead, isPending: isCreatingLead } = useLead();
    const { data: clientLeadsData, isLoading: isLoadingLeads } = useClientLeads();
    const greenLeads = clientLeadsData?.data.filter(ref=> ref.status === "GREEN" ).length;

    const leads = clientLeadsData?.data || [];
    const sortedLeads = [
        ...leads.filter(l => l.status === 'GREEN'),
        ...leads.filter(l => l.status === 'YELLOW'),
        ...leads.filter(l => l.status === 'RED'),
    ];

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setStep(1);
        setReferralData(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setStep(1);
        setReferralData(null);
    };

    const handleFormSubmit = (data: { name: string; email: string; phone: string }) => {
        setReferralData(data);
        setStep(2);
    };

    const handleQuestionsSubmit = (leadData: LeadInput) => {
        createLead(leadData, {
            onSuccess: () => {
                handleCloseModal();
            },
        });
    };

    return (
        <div className="space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white">
                    <h3 className="text-lg font-medium opacity-90">Tus Recompensas</h3>
                    <div className="mt-4 flex items-baseline">
                        <p className="text-5xl font-extrabold">{greenLeads || []}</p>
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

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Mis Referidos</h3>

                {isLoadingLeads ? (
                    <p className="text-center text-gray-500">Cargando referidos...</p>
                ) : sortedLeads.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Aún no tienes referidos. ¡Agrega uno!</p>
                ) : (
                    <div className="space-y-3">
                        {sortedLeads.map((lead) => (
                            <div
                                key={lead.leadId}
                                className={`p-4 rounded-lg border-l-4 flex justify-between items-center ${
                                    lead.status === 'GREEN'
                                        ? 'bg-green-50 border-l-green-500'
                                        : lead.status === 'YELLOW'
                                        ? 'bg-yellow-50 border-l-yellow-500 opacity-75'
                                        : 'bg-red-50 border-l-red-500 opacity-50'
                                }`}
                            >
                                <div>
                                    <p className="font-semibold text-gray-800">{lead.name}</p>
                                    <p className="text-sm text-gray-600">{lead.email}</p>
                                    <p className="text-xs text-gray-500 mt-1">{lead.phone}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            lead.status === 'GREEN'
                                                ? 'bg-green-200 text-green-800'
                                                : lead.status === 'YELLOW'
                                                ? 'bg-yellow-200 text-yellow-800'
                                                : 'bg-red-200 text-red-800'
                                        }`}
                                    >
                                        {lead.status === 'GREEN' ? '✓ Válido' : lead.status === 'YELLOW' ? '⊘ En revisión' : '✗ Rechazado'}
                                    </span>
                                    {lead.status !== 'GREEN' && (
                                        <p className="text-xs text-gray-500 italic">
                                            {lead.status === 'YELLOW' ? 'No cuenta para recompensas' : 'No cuenta para recompensas'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={step === 1 ? "Registrar Nuevo Referido" : "Responder Encuesta"}
            >
                {step === 1 && (
                    <AddReferralForm
                        onSubmit={handleFormSubmit}
                        isLoading={false}
                    />
                )}
                {step === 2 && referralData && (
                    <QuestionsForm
                        questions={questions}
                        referralData={referralData}
                        onSubmit={handleQuestionsSubmit}
                        isLoading={isCreatingLead}
                    />
                )}
            </Modal>
        </div>
    );
};
