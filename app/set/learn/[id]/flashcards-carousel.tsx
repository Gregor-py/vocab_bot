"use client"

import {Flashcard} from "@/db/schema";
import {Carousel, type CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {FlipCard} from "@/app/set/learn/[id]/flip-card";
import {useLearningStore} from "@/app/set/learn/[id]/useLearningStore";
import {TrackNextIcon} from "@radix-ui/react-icons";
import {ArrowBigLeftIcon, ArrowBigRightDashIcon} from "lucide-react";

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

        updateCurrentCard(api.selectedScrollSnap())

        api.on("select", () => {
            updateCurrentCard(api.selectedScrollSnap())
        })
    }, [api, updateCurrentCard])

    return (
        <Carousel opts={{watchDrag: false, }} setApi={setApi} className="mx-auto">
            <CarouselContent>
                {flashcards.map((flashcard, index) => (
                    <CarouselItem className={"px-9 self-center"} key={flashcard.id}>
                        <div className={"flex justify-center items-center "}>
                            <FlipCard
                                active={currentCard === index}
                                frontText={flashcard.term || ""}
                                backText={flashcard.backSide || ""}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className={"flex justify-center gap-5 mt-4"}>
                <Button onClick={() => api?.scrollPrev()}><ArrowBigLeftIcon /></Button>
                <Button onClick={() => api?.scrollNext()}><ArrowBigRightDashIcon /></Button>
            </div>
        </Carousel>
    )
}