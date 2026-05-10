import { useState } from 'react';
import { useQuestions } from '../hooks/useQuestions';
import { questionSchema, type QuestionInput } from '../schemas/questions.schema';
import type { Question } from '../../../shared/types/types';

export const QuestionsCRUD = () => {
    const { data: questions = [], createMutation, updateMutation, deleteMutation, isCreating, isUpdating, isDeleting } = useQuestions();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const validateForm = (data: Partial<QuestionInput>) => {
        try {
            questionSchema.parse(data);
            setErrors({});
            return true;
        } catch (error: any) {
            const newErrors: { [key: string]: string } = {};
            error.errors.forEach((err: any) => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);
            return false;
        }
    };

    const handleCreate = (formData: Partial<QuestionInput>) => {
        if (!validateForm(formData)) return;
        createMutation.mutate(formData as QuestionInput, {
            onSuccess: () => {
                setIsAdding(false);
                setErrors({});
            },
        });
    };

    const handleUpdate = (id: string, formData: Partial<QuestionInput>) => {
        if (!validateForm(formData)) return;
        updateMutation.mutate(
            { id, data: formData as QuestionInput },
            {
                onSuccess: () => {
                    setEditingId(null);
                    setErrors({});
                },
            }
        );
    };

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id, {
            onSuccess: () => {
                setDeleteConfirm(null);
            },
        });
    };

    const toggleActive = (question: Question) => {
        handleUpdate(question.id, {
            text: question.text,
            weight: question.weight,
            isActive: !question.isActive,
        });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Editar Mis Preguntas</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Pregunta</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Peso</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Estado</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question) => (
                                <tr key={question.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    {editingId === question.id ? (
                                        <EditRow
                                            question={question}
                                            onSave={handleUpdate}
                                            onCancel={() => setEditingId(null)}
                                            errors={errors}
                                            isLoading={isUpdating}
                                        />
                                    ) : (
                                        <>
                                            <td className="py-3 px-4 text-gray-800">{question.text}</td>
                                            <td className="py-3 px-4 text-gray-800">{question.weight}</td>
                                            <td className="py-3 px-4">
                                                <button
                                                    onClick={() => toggleActive(question)}
                                                    disabled={isUpdating}
                                                    className={`px-3 py-1 rounded-lg font-medium text-sm transition-colors ${
                                                        question.isActive
                                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    } disabled:opacity-50`}
                                                >
                                                    {question.isActive ? 'Activa' : 'Inactiva'}
                                                </button>
                                            </td>
                                            <td className="py-3 px-4 flex gap-2">
                                                <button
                                                    onClick={() => setEditingId(question.id)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(question.id)}
                                                    className="text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    Eliminar
                                                </button>
                                                {deleteConfirm === question.id && (
                                                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                                            <p className="mb-4 text-gray-700">¿Estás seguro de que quieres eliminar esta pregunta?</p>
                                                            <div className="flex gap-3">
                                                                <button
                                                                    onClick={() => handleDelete(question.id)}
                                                                    disabled={isDeleting}
                                                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                                                                >
                                                                    {isDeleting ? 'Eliminando...' : 'Eliminar'}
                                                                </button>
                                                                <button
                                                                    onClick={() => setDeleteConfirm(null)}
                                                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                                                >
                                                                    Cancelar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            {isAdding && (
                                <NewRow
                                    onSave={handleCreate}
                                    onCancel={() => setIsAdding(false)}
                                    errors={errors}
                                    isLoading={isCreating}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                        Nueva Pregunta
                    </button>
                )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Preguntas Activas</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Pregunta</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Peso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions
                                .filter((q) => q.isActive)
                                .map((question) => (
                                    <tr key={question.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4 text-gray-800">{question.text}</td>
                                        <td className="py-3 px-4 text-gray-800">{question.weight}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {questions.filter((q) => q.isActive).length === 0 && (
                        <p className="text-center py-4 text-gray-500">No hay preguntas activas</p>
                    )}
                </div>
            </div>
        </div>
    );
};

interface EditRowProps {
    question: Question;
    onSave: (id: string, data: Partial<QuestionInput>) => void;
    onCancel: () => void;
    errors: { [key: string]: string };
    isLoading: boolean;
}

const EditRow = ({ question, onSave, onCancel, errors, isLoading }: EditRowProps) => {
    const [text, setText] = useState(question.text);
    const [weight, setWeight] = useState(question.weight);

    return (
        <>
            <td className="py-3 px-4">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    disabled={isLoading}
                />
                {errors.text && <p className="text-red-600 text-xs mt-1">{errors.text}</p>}
            </td>
            <td className="py-3 px-4">
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    disabled={isLoading}
                />
                {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
            </td>
            <td colSpan={2} className="py-3 px-4 flex gap-2">
                <button
                    onClick={() => onSave(question.id, { text, weight })}
                    disabled={isLoading}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {isLoading ? 'Guardando...' : 'Guardar'}
                </button>
                <button
                    onClick={onCancel}
                    disabled={isLoading}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 disabled:opacity-50"
                >
                    Cancelar
                </button>
            </td>
        </>
    );
};

interface NewRowProps {
    onSave: (data: Partial<QuestionInput>) => void;
    onCancel: () => void;
    errors: { [key: string]: string };
    isLoading: boolean;
}

const NewRow = ({ onSave, onCancel, errors, isLoading }: NewRowProps) => {
    const [text, setText] = useState('');
    const [weight, setWeight] = useState(5);

    return (
        <>
            <td className="py-3 px-4">
                <input
                    type="text"
                    placeholder="Escribe la pregunta"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    disabled={isLoading}
                />
                {errors.text && <p className="text-red-600 text-xs mt-1">{errors.text}</p>}
            </td>
            <td className="py-3 px-4">
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    disabled={isLoading}
                    min="1"
                    max="100"
                />
                {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
            </td>
            <td colSpan={2} className="py-3 px-4 flex gap-2">
                <button
                    onClick={() => onSave({ text, weight })}
                    disabled={isLoading}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {isLoading ? 'Creando...' : 'Crear'}
                </button>
                <button
                    onClick={onCancel}
                    disabled={isLoading}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 disabled:opacity-50"
                >
                    Cancelar
                </button>
            </td>
        </>
    );
};
