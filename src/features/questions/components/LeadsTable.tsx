import type { LeadResponse } from '../services/leads.service';

interface LeadsTableProps {
    leads: LeadResponse[];
    isLoading: boolean;
}

export const LeadsTable = ({ leads, isLoading }: LeadsTableProps) => {
    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-center text-gray-500">Cargando resultados...</p>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'GREEN':
                return 'bg-green-100 text-green-700';
            case 'YELLOW':
                return 'bg-yellow-100 text-yellow-700';
            case 'RED':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Resultados de Prospectos</h3>

            {leads.length === 0 ? (
                <p className="text-center text-gray-500 py-6">No hay resultados aún</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Nombre</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Teléfono</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Score</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Estado</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead.leadId} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-800 font-medium">{lead.name}</td>
                                    <td className="py-3 px-4 text-gray-600">{lead.email}</td>
                                    <td className="py-3 px-4 text-gray-600">{lead.phone}</td>
                                    <td className="py-3 px-4 text-gray-800 font-semibold">{lead.score}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-500 text-xs">
                                        {new Date(lead.createdAt).toLocaleDateString('es-ES')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
