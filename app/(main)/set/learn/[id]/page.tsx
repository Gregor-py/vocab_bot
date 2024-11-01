import {getSetById} from "@/db/queries";
import {redirect} from "next/navigation";
import parse from 'html-react-parser';
import {Button} from "@/components/ui/button";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Link from "next/link";
import React from "react";
import {FlashcardsCarousel} from "@/app/(main)/set/learn/[id]/flashcards-carousel";

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
            <div className={"h-14 flex items-center justify-end"}>
                <Link href={`/set/${params.id}`}>
                    <Button variant={"destructive"} size={"icon"}><CloseIcon/></Button>
                </Link>
            </div>
            <FlashcardsCarousel flashcards={set.flashcards} />
        </div>
    )
}

export default LearnSetPage;