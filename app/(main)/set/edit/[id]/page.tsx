import {getSetById} from "@/db/queries";
import {FlashcardsList} from "@/app/(main)/set/edit/[id]/flashcards-list";
import {SetTitle} from "@/app/(main)/set/edit/[id]/set-title";
import {redirect} from "next/navigation";

interface SetPageProps {
    params: {
        id: number;
    };
}
const SetEditPage = async ({ params }: SetPageProps) => {
    const [set] = await Promise.all([getSetById(params.id)])

    if (!set) {
        redirect("/")
    }

    return (
        <div className={"mt-4"}>
            <h2 className={"text-4xl"}>Edit a new flashcards set</h2>

            <div className={"mt-3"}>
                <SetTitle set={set} />
            </div>

            <FlashcardsList language={set.language.name} setId={params.id} />
        </div>
    )
}

export default SetEditPage