import { useState } from 'react';
import type { LeadResponse } from '../services/leads.service';

interface LeadDetailProps {
    lead: LeadResponse;
    onUpdate?: (leadId: string, data: { isContacted?: boolean; comments?: string }) => void;
}

export const LeadDetail = ({ lead, onUpdate }: LeadDetailProps) => {
    const [isContacted, setIsContacted] = useState(lead.isContacted || false);
    const [comments, setComments] = useState(lead.comments || '');
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        onUpdate?.(lead.leadId, { isContacted, comments });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100 animate-fade-in">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Detalles del Referido</h3>

            <div className="space-y-4">
                <div className="space-y-1">
                    <p className="text-green-900 font-bold text-xl">{lead.name}</p>
                    <p className="text-green-700">{lead.email}</p>
                    <p className="text-green-700">{lead.phone}</p>
                    <div className="flex gap-4 mt-3 text-sm">
                        <span className="text-green-600 font-medium">Score: {lead.score}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                            lead.status === 'GREEN' ? 'bg-green-100 text-green-700' :
                            lead.status === 'YELLOW' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {lead.status}
                        </span>
                    </div>
                    <p className="text-green-600 text-xs mt-2 italic">
                        Registrado el: {new Date(lead.createdAt).toLocaleDateString('es-ES')}
                    </p>
                </div>

                <div className="border-t border-green-200 pt-4 space-y-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id={`contacted-${lead.leadId}`}
                            checked={isContacted}
                            onChange={(e) => setIsContacted(e.target.checked)}
                            className="w-5 h-5 cursor-pointer"
                        />
                        <label htmlFor={`contacted-${lead.leadId}`} className="text-green-700 font-medium cursor-pointer">
                            Contactado
                        </label>
                    </div>

                    <div>
                        <label htmlFor={`comments-${lead.leadId}`} className="block text-sm font-medium text-green-700 mb-2">
                            Comentarios
                        </label>
                        <textarea
                            id={`comments-${lead.leadId}`}
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Agrega notas sobre este referido..."
                            className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                            rows={4}
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                    >
                        {isSaved ? '✓ Guardado' : 'Guardar'}
                    </button>
                </div>
            </div>
        </div>
    );
};
