import {getSetById} from "@/db/queries";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface SetPageProps {
    params: {
        id: number;
    };
}

const LearnSetPage = async ({params}: SetPageProps) => {
    const set = await getSetById(params.id)

    if (!set) {
        redirect("/dashboard")
    }

    return (
        <div>

            <div className={"text-5xl"}>{set?.name}</div>
            <div className={"text-neutral-400 text-xl"}>{set?.language.name}</div>
            <div className={"mt-4"}>
                <Link href={`/set/learn/${params.id}`} >
                    <Button>
                        Learn Flashcards
                    </Button>
                </Link>
                <Link href={`/set/edit/${params.id}`} >
                    <Button>
                        Edit Flashcards
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default LearnSetPage;