import {useState} from 'react';
import clsx from 'clsx';
import {cn} from "@/lib/utils";
import axios from "axios";

type Props = {
    initialType: "structured" | "unstructured",
    id: number;
}

export const TypeSwitcher = ({initialType, id}: Props) => {
    const [type, setType] = useState<'structured' | 'unstructured'>(initialType);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        setIsLoading(true);
        const nextValue = type === "structured" ? "unstructured" : "structured"
        await axios.put(`/api/flashcard/${id}`, {"type": nextValue})
        setType(nextValue);
        setIsLoading(false)
    };

    return (
        <div className="flex items-center gap-3">
            <span className={clsx('text-lg font-medium')}>Structured</span>
            <button
                onClick={handleToggle}
                disabled={isLoading}
                className={cn(
                    'w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300',
                    type === 'unstructured' ? 'bg-gray-500' : 'bg-blue-400',
                    isLoading ? 'bg-yellow-400 cursor-wait' : ''
                )}
            >
                <div
                    className={cn(
                        'w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300',
                        type === 'unstructured' ? 'translate-x-8' : 'translate-x-0'
                    )}
                />
            </button>
            <span className={clsx('ml-2 text-lg font-medium')}>Unstructured</span>
        </div>
    );
};
