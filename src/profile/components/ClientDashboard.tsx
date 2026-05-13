import { useState } from "react";
import { useAuthStore } from "../../features/auth/store/auth.store";
import { Modal } from "../../shared/components/Modal";
import { AddReferralForm } from "../../features/referrals/components/AddReferralForm";
import { useAgentQuestions } from "../../features/questions/hooks/useAgentQuestions";
import { QuestionsForm } from "../../features/questions/components/QuestionsForm";
import { useLead } from "../../features/questions/hooks/useLead";
import { useClientLeads } from "../../features/questions/hooks/useClientLeads";
import type { LeadInput } from "../../features/questions/services/leads.service";
import { useAgent } from "../../features/agents/hooks/useAgent";
import { ReviewForm } from "../../features/agents/components/ReviewForm";
import type { ReviewReceived } from "../../shared/types/types";

export const ClientDashboard = () => {
    const user = useAuthStore((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [referralData, setReferralData] = useState<{ name: string; email: string; phone: string } | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const { data: questions = [] } = useAgentQuestions(user?.agent?.id);
    const { mutate: createLead, isPending: isCreatingLead } = useLead();
    const { data: clientLeadsData, isLoading: isLoadingLeads } = useClientLeads();
    const { data: agentProfile } = useAgent(user?.agent?.agentCode || null);

    const hasClientReview = agentProfile?.reviewsReceived?.some(
        (review: ReviewReceived) => review.client?.name === user?.name
    ) || false;
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
        <div className="space-y-4 md:space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-blue-700 p-3 md:p-8 rounded-lg shadow text-white">
                    <h3 className="text-sm md:text-lg font-medium opacity-90 uppercase tracking-wide">Tus Recompensas</h3>
                    <div className="mt-6 flex items-baseline gap-2">
                        <p className="text-4xl md:text-5xl font-extrabold">{greenLeads || 0}</p>
                        <p className="text-xs md:text-base text-green-100">Referidos Verdes</p>
                    </div>
                    <p className="mt-6 text-xs md:text-sm bg-blue-50/20 p-3 rounded-lg inline-block">
                        ¡Sigue así para desbloquear el siguiente nivel!
                    </p>
                </div>

                <div className="bg-blue-50 p-6 md:p-8 rounded-lg shadow border border-blue-200 flex flex-col justify-center items-center text-center">
                    <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-2">Nuevo Referido</h3>
                    <p className="text-blue-600 mb-6 text-xs md:text-sm">Completa la encuesta para calificar a tu referido.</p>
                    <button
                        onClick={handleOpenModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded transition-colors text-sm md:text-base w-full md:w-auto"
                    >
                        + Agregar Referido
                    </button>
                </div>
            </section>

            {!hasClientReview && user?.agent && (
                <section className="bg-blue-50 p-6 md:p-8 rounded-lg shadow border border-blue-200">
                    <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-2">Califica a tu Agente</h3>
                    <p className="text-sm md:text-base text-blue-600 mb-6 capitalize">{user.agent.name ? `Comparte tu experiencia con ${user.agent.name}` : 'Comparte tu experiencia con tu agente'}</p>
                    <button
                        onClick={() => setIsReviewModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded transition-colors text-sm md:text-base w-full md:w-auto"
                    >
                        ⭐ Dejar Reseña
                    </button>
                </section>
            )}

            <section className="bg-blue-50 p-6 md:p-8 rounded-lg shadow border border-blue-200">
                <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-6">Mis Referidos</h3>

                {isLoadingLeads ? (
                    <p className="text-center text-sm md:text-base text-gray-500 py-8">Cargando referidos...</p>
                ) : sortedLeads.length === 0 ? (
                    <p className="text-center text-sm md:text-base text-gray-500 py-8">Aún no tienes referidos. ¡Agrega uno!</p>
                ) : (
                    <div className="space-y-3">
                        {sortedLeads.map((lead) => (
                            <div
                                key={lead.leadId}
                                className={`p-2 md:p-5 rounded-lg border-l-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 ${
                                    lead.status === 'GREEN'
                                        ? 'bg-green-50 border-l-green-500'
                                        : lead.status === 'YELLOW'
                                        ? 'bg-yellow-50 border-l-yellow-500'
                                        : 'bg-red-50 border-l-red-500'
                                }`}
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm md:text-base text-gray-800 truncate capitalize">{lead.name}</p>
                                    <p className="text-xs md:text-sm text-gray-600 truncate">{lead.email}</p>
                                    <p className="text-xs text-gray-500 mt-1">{lead.phone}</p>
                                </div>
                                <div className="flex flex-col md:items-end gap-2 md:flex-shrink-0">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
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
                                            No cuenta para recompensas
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {isModalOpen && (
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
            )}

            {isReviewModalOpen && (
                <Modal
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                    title="Deja tu Reseña"
                >
                    {user?.agent?.id && (
                        <ReviewForm
                            agentId={user.agent.id}
                            onSuccess={() => setIsReviewModalOpen(false)}
                        />
                    )}
                </Modal>
            )}
        </div>
    );
};
