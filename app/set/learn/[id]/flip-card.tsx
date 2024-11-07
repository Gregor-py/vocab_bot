"use client"

import parse from 'html-react-parser';
import {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";

type FlipCard = {
    frontText: string;
    backText: string;
    active: boolean;
}

export const FlipCard = ({ frontText, backText, active }: FlipCard) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [backsideWithScroll, setBackSideWithScroll] = useState(false);
    const [backsideScroll, setBacksideScroll] = useState(0);
    const ref = useRef<HTMLDivElement>(null)

    const handleFlip = () => {
        if (!active) {
            return
        }

        setIsFlipped(prev => !prev);
    }
    
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                handleFlip()
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isFlipped, handleFlip]);
    

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        if (ref.current.scrollHeight > ref.current.clientHeight) {
            setBackSideWithScroll(true);
        }
    }, []);

    return (
        <div className="w-full" style={{ perspective: "2000px", userSelect: "none" }}>
            <div
                onClick={handleFlip}
                className="relative cursor-pointer min-h-[600px] max-h-[600px]"
                style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.4s linear",
                    transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)"
                }}
            >
                <div
                    className="absolute w-full min-h-full bg-neutral-900 p-6 flex items-center justify-center rounded-xl shadow-lg text-6xl right-0 top-0"
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
                    className="absolute overflow-auto w-full max-h-[600px] justify-center min-h-full bg-neutral-900 p-6 flex rounded-xl shadow-lg text-2xl right-0 top-0"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateX(180deg)"
                    }}
                    ref={ref}
                    onScroll={() => {
                        if (ref.current) {
                            setBacksideScroll(ref.current.scrollTop)
                        }
                    }}
                >
                    <div className={"h-full relative pb-8"}>
                        {parse(backText)}
                    </div>
                    <div className={cn(backsideWithScroll && backsideScroll <= 0 ? "opacity-100" : "opacity-0","h-20 absolute bottom-0 w-full bg-gradient-to-t from-neutral-900 to-transparent")}/>
                </div>
            </div>
        </div>
    );
};