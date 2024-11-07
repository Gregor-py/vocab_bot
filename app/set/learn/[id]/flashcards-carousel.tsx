"use client"

import {Flashcard} from "@/db/schema";
import {Carousel, type CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {FlipCard} from "@/app/set/learn/[id]/flip-card";
import {useLearningStore} from "@/app/set/learn/[id]/useLearningStore";

type Props = {
    flashcards: Flashcard[]
}

export const FlashcardsCarousel = ({flashcards}: Props) => {
    const [api, setApi] = useState<CarouselApi>()

    const updateCurrentCard = useLearningStore(state => state.updateCurrentCard)
    const currentCard = useLearningStore(state => state.currentCard)

    useEffect(() => {
        if (!api) {
            return
        }

        updateCurrentCard(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            updateCurrentCard(api.selectedScrollSnap() + 1)
        })
    }, [api, updateCurrentCard])

    return (
        <Carousel opts={{watchDrag: false, }} setApi={setApi} className="mx-auto">
            <CarouselContent className={"px-16"}>
                {flashcards.map((flashcard, index) => (
                    <CarouselItem className={"pl-8 self-center"} key={flashcard.id}>
                        <div className={"flex justify-center items-center "}>
                            <FlipCard
                                active={currentCard === index+1}
                                frontText={flashcard.term || ""}
                                backText={flashcard.backSide || ""}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <Button onClick={() => api?.scrollNext()}>Learned</Button>
        </Carousel>
    )
}