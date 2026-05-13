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
    const [showMenu, setShowMenu] = useState(false);
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
                    setShowMenu(false);
                },
            },
        );
    };

    const handleReactivate = () => {
        reactivate(agentId, {
            onSuccess: () => {
                setShowMenu(false);
            },
        });
    };

    const handleDelete = () => {
        deleteAgent(agentId, {
            onSuccess: () => {
                setShowConfirmDelete(false);
                setShowMenu(false);
            },
        });
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            >
                ⋯
            </button>

            {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {isActive ? (
                        <>
                            <button
                                onClick={() => {
                                    setShowDeactivateModal(true);
                                    setShowMenu(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100"
                            >
                                Desactivar
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirmDelete(true);
                                    setShowMenu(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                Eliminar permanentemente
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleReactivate}
                            disabled={isReactivating}
                            className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 disabled:opacity-50"
                        >
                            {isReactivating ? 'Reactivando...' : 'Reactivar'}
                        </button>
                    )}
                </div>
            )}

            {/* Modal desactivar */}
            {showDeactivateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-bold mb-4">
                            Desactivar Agente
                        </h3>
                        <textarea
                            value={deactivateReason}
                            onChange={(e) => setDeactivateReason(e.target.value)}
                            placeholder="Razón de desactivación"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors"
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
                            ⚠️ Eliminar Permanentemente
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Esta acción es irreversible. Se eliminarán el agente,
                            sus clientes y todos los datos relacionados.
                        </p>
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
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                            >
                                {isDeleting ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
