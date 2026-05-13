import { useState } from 'react';
import {
    useDeactivateAgent,
    useReactivateAgent,
    useDeleteAgentPermanent,
} from '../hooks';

interface AgentActionsDropdownProps {
    agentId: string;
    isActive: boolean;
}

export const AgentActionsDropdown = ({
    agentId,
    isActive,
}: AgentActionsDropdownProps) => {
    const [showActionsModal, setShowActionsModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [deactivateReason, setDeactivateReason] = useState('');
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const { mutate: deactivate, isPending: isDeactivating } =
        useDeactivateAgent();
    const { mutate: reactivate, isPending: isReactivating } =
        useReactivateAgent();
    const { mutate: deleteAgent, isPending: isDeleting } =
        useDeleteAgentPermanent();

    const handleDeactivate = () => {
        deactivate(
            { agentId, reason: deactivateReason },
            {
                onSuccess: () => {
                    setShowDeactivateModal(false);
                    setDeactivateReason('');
                    setShowActionsModal(false);
                },
            },
        );
    };

    const handleReactivate = () => {
        reactivate(agentId, {
            onSuccess: () => {
                setShowActionsModal(false);
            },
        });
    };

    const handleDelete = () => {
        deleteAgent(agentId, {
            onSuccess: () => {
                setShowConfirmDelete(false);
                setShowActionsModal(false);
            },
        });
    };

    return (
        <>
            <button
                onClick={() => setShowActionsModal(true)}
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors font-medium"
            >
                Acciones
            </button>

            {/* Modal de acciones */}
            {showActionsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-bold mb-6 text-gray-900">
                            Acciones del Agente
                        </h3>
                        <div className="space-y-3">
                            {isActive ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setShowDeactivateModal(true);
                                            setShowActionsModal(false);
                                        }}
                                        className="w-full px-4 py-3 text-left bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-yellow-800 rounded-lg transition-colors font-medium"
                                    >
                                        ⚠️ Desactivar Agente
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowConfirmDelete(true);
                                            setShowActionsModal(false);
                                        }}
                                        className="w-full px-4 py-3 text-left bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 rounded-lg transition-colors font-medium"
                                    >
                                        🗑️ Eliminar Permanentemente
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleReactivate}
                                    disabled={isReactivating}
                                    className="w-full px-4 py-3 text-left bg-green-50 hover:bg-green-100 border border-green-200 text-green-800 rounded-lg transition-colors font-medium disabled:opacity-50"
                                >
                                    {isReactivating ? '⏳ Reactivando...' : '✅ Reactivar Agente'}
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setShowActionsModal(false)}
                            className="w-full mt-4 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal desactivar */}
            {showDeactivateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-bold mb-4 text-yellow-700">
                            ⚠️ Desactivar Agente
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">
                            El agente no podrá acceder a su cuenta. Puedes reactivarlo después.
                        </p>
                        <textarea
                            value={deactivateReason}
                            onChange={(e) => setDeactivateReason(e.target.value)}
                            placeholder="Razón de desactivación"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            rows={3}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeactivateModal(false)}
                                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeactivate}
                                disabled={isDeactivating || !deactivateReason}
                                className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 transition-colors font-medium"
                            >
                                {isDeactivating ? 'Desactivando...' : 'Desactivar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal confirmar eliminar */}
            {showConfirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-bold text-red-600 mb-4">
                            🗑️ Eliminar Permanentemente
                        </h3>
                        <p className="text-gray-700 mb-6 text-sm">
                            Esta acción es <span className="font-bold">irreversible</span>. Se eliminarán:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-600 mb-6 space-y-1">
                            <li>El agente</li>
                            <li>Todos sus clientes</li>
                            <li>Todos los datos relacionados</li>
                        </ul>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirmDelete(false)}
                                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors font-medium"
                            >
                                {isDeleting ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
