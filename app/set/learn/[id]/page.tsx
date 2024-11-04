import {getSetById} from "@/db/queries";
import {redirect} from "next/navigation";
import React from "react";
import {FlashcardsCarousel} from "@/app/set/learn/[id]/flashcards-carousel";
import {LearningHeader} from "@/app/set/learn/[id]/learning-header";

interface LearnSetPageProps {
    params: {
        id: number;
    };
}

const LearnSetPage = async ({params}: LearnSetPageProps) => {
    const set = await getSetById(params.id)

    if (!set) {
        redirect("/dashboard")
    }

    return (
        <div className={""}>
            <LearningHeader set={set} />
            <FlashcardsCarousel flashcards={set.flashcards} />
        </div>
    )
}

export default LearnSetPage;