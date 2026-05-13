import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Question } from '../../../shared/types/types';
import type { LeadInput } from '../services/leads.service';

interface QuestionsFormProps {
    questions: Question[];
    referralData: { name: string; email: string; phone: string };
    onSubmit: (data: LeadInput) => void;
    isLoading: boolean;
}

const createAnswersSchema = (questionIds: string[]) =>
    z.object({
        answers: z.record(z.string(), z.union([z.literal(0), z.literal(1)]))
            .refine(
                (answers) => questionIds.every((id) => id in answers && (answers[id] === 0 || answers[id] === 1)),
                'Debes responder todas las preguntas'
            ),
    });

export const QuestionsForm = ({
    questions,
    referralData,
    onSubmit,
    isLoading,
}: QuestionsFormProps) => {

    const questionIds = questions.map((q) => q.id);
    const answersSchema = createAnswersSchema(questionIds);
    type AnswersFormData = z.infer<typeof answersSchema>;

    const {
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm<AnswersFormData>({
        resolver: zodResolver(answersSchema),
        mode: 'onChange',
        defaultValues: {
            answers: questionIds.reduce(
                (acc, id) => ({ ...acc, [id]: undefined }),
                {} as Record<string, 0 | 1 | undefined>
            ),
        },
    });

    const answers = watch('answers');

    const isAllAnswered = questions.length > 0 && questions
            .every((q) => answers[q.id] === 0 || answers[q.id] === 1);

    const handleSubmitForm = (formData: AnswersFormData) => {
        const answersList = questions.map((question) => ({
            questionId: question.id,
            value: formData.answers[question.id] as 0 | 1,
        }));

        const leadData: LeadInput = {
            name: referralData.name,
            email: referralData.email,
            phone: referralData.phone,
            answers: answersList,
        };

        onSubmit(leadData);
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 ">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Resumen del Referido</h4>
                <div className="space-y-1 text-sm">
                    <p>
                        <span className="font-medium text-gray-600">Nombre:</span>{' '}
                        <span className="text-gray-900">{referralData.name}</span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Email:</span>{' '}
                        <span className="text-gray-900">{referralData.email}</span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Teléfono:</span>{' '}
                        <span className="text-gray-900">{referralData.phone}</span>
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Responde las preguntas</h3>
                {questions.map((question) => (
                    <div key={question.id} className="bg-blue-50 p-4 rounded-xl border border-gray-200">
                        <p className="text-gray-800 font-medium mb-3">{question.text}</p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setValue(`answers.${question.id}`, 1)}
                                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                                    answers[question.id] === 1
                                        ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Sí
                            </button>
                            <button
                                type="button"
                                onClick={() => setValue(`answers.${question.id}`, 0)}
                                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                                    answers[question.id] === 0
                                        ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                No
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {errors.answers && typeof errors.answers.message === 'string' && (
                <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg">
                    {errors.answers.message}
                </p>
            )}

            <button
                type="submit"
                disabled={isLoading || !isAllAnswered}
                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-200 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Enviando...
                    </span>
                ) : (
                    'Confirmar y Enviar'
                )}
            </button>
        </form>
    );
};
