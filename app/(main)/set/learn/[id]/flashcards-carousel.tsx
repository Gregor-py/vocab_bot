"use client"

import {Flashcard} from "@/db/schema";
import {Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

type Props = {
    flashcards: Flashcard[]
}

export const FlashcardsCarousel = ({flashcards}: Props) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <Carousel opts={{watchDrag: false}} setApi={setApi} className="w-full ">
            <CarouselContent className={""}>
                {flashcards.map((flashcard, index) => (
                    <CarouselItem key={index}>
                        <div className={"min-h-96 bg-neutral-900"}>

                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <Button onClick={() => api?.scrollPrev()}>Prev</Button>
            <Button onClick={() => api?.scrollNext()}>Next</Button>
        </Carousel>
    )
}