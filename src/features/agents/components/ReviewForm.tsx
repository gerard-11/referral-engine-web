import { useState } from 'react';
import { useCreateReview } from '../hooks/useCreateReview';

interface ReviewFormProps {
    agentId: string;
    onSuccess?: () => void;
}

export const ReviewForm = ({ agentId, onSuccess }: ReviewFormProps) => {
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    const { mutate: createReview, isPending } = useCreateReview();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createReview(
            { agentId, rating, content },
            {
                onSuccess: () => {
                    setRating(5);
                    setContent('');
                    onSuccess?.();
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calificación
                </label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`text-3xl transition-colors ${
                                star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tu comentario
                </label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Cuéntanos tu experiencia con este agente..."
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                />
            </div>

            <button
                type="submit"
                disabled={isPending || !content.trim()}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            >
                {isPending ? 'Enviando...' : 'Enviar Reseña'}
            </button>
        </form>
    );
};
