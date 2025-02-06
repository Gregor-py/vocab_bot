import {getSetById} from "@/db/queries";
import {FlashcardsList} from "@/app/(main)/set/edit/[id]/flashcards-list";
import {SetTitle} from "@/app/(main)/set/edit/[id]/set-title";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import {AiPresetSelect} from "@/app/(main)/set/edit/[id]/ai-preset-select";

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
            <h2 className={"text-3xl"}>Edit a new flashcards set</h2>

            <div className={"mt-3"}>
                <SetTitle set={set} />
            </div>

            <div className={"mt-3"}>
                <div className={"flex gap-4"}>
                    <div className={'flex-1'}>
                        <AiPresetSelect />
                    </div>
                    <Button variant={"secondary"}>Manage your ai presets</Button>
                </div>
            </div>

            <FlashcardsList language={set.language.name} setId={params.id} />
        </div>
    )
}

export default SetEditPage