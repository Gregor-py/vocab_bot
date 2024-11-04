"use client"

import parse from 'html-react-parser';
import {useEffect, useState} from "react";

type FlipCard = {
    frontText: string;
    backText: string;
    active: boolean;
}

export const FlipCard = ({ frontText, backText, active }: FlipCard) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                handleFlip()
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isFlipped]);

    const handleFlip = () => {
        if (!active) {
            return
        }

        setIsFlipped(prev => !prev);
    }

    return (
        <div className="w-full" style={{ perspective: "2000px", userSelect: "none" }}>
            <div
                onClick={handleFlip}
                className="relative min-h-screen cursor-pointer"
                style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.4s linear",
                    transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)"
                }}
            >
                <div
                    className="absolute w-full h-full bg-neutral-900 p-4 flex items-center justify-center rounded-xl shadow-lg text-6xl"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden"
                    }}
                >
                    <div>
                        {parse(frontText)}
                    </div>
                </div>

                <div
                    className="absolute w-full h-full bg-neutral-900 p-4 flex items-center justify-center rounded-xl shadow-lg overflow-auto"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateX(180deg)"
                    }}
                >
                    <div>
                        {parse(backText)}{parse(backText)}
                    </div>
                </div>
            </div>
        </div>
    );
};