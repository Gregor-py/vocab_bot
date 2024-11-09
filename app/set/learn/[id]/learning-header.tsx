"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import React from "react";
import {useLearningStore} from "@/app/set/learn/[id]/useLearningStore";
import { SetType } from "@/db/schema";
import {ProgressBar} from "@/components/ui/progressbar";

type Props = {
    set: SetType;
}

export const LearningHeader = ({set}:  Props) => {
    const currentCard = useLearningStore(state => state.currentCard)

    let percent = 0

    if (set.flashcards.length !== 0) {
        percent = Math.floor(((currentCard ) / set.flashcards.length) * 100);
    }

    return (
        <div className={"relative h-20 text-3xl"}>
            <div className={"flex items-center py-5 justify-between px-10"}>
                <div></div>
                <div>
                    {currentCard + 1} / {set.flashcards.length}
                </div>
                <Link href={`/set/${set.id}`}>
                    <Button variant={"destructive"} size={"icon"}><CloseIcon/></Button>
                </Link>
            </div>
            <div className={"w-full"}>
                <ProgressBar percent={percent}/>
            </div>
        </div>
    )
}