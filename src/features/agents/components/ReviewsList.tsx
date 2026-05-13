import type { ReviewReceived } from '../../../shared/types/types';

interface ReviewsListProps {
    reviews: ReviewReceived[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                <p>Aún no hay reseñas</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="bg-blue-50 p-6 rounded-lg border border-gray-200 shadow-sm"
                >
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <p className="font-semibold text-gray-900">{review.client.name}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString('es-ES')}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`text-lg ${
                                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                </div>
            ))}
        </div>
    );
};
