"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import React from "react";
import {useLearningStore} from "@/app/set/learn/[id]/useLearningStore";
import { SetType } from "@/db/schema";

type Props = {
    set: SetType;
}

export const LearningHeader = ({set}:  Props) => {
    const currentCard = useLearningStore(state => state.currentCard)

    return (
        <div className={"h-14 flex items-center justify-between max-w-[70%] mx-auto"}>
            <div></div>
            <div className={"text-3xl"}>
                {currentCard} / {set.flashcards.length}
            </div>
            <Link href={`/set/${set.id}`}>
                <Button variant={"destructive"} size={"icon"}><CloseIcon/></Button>
            </Link>
        </div>
    )
}