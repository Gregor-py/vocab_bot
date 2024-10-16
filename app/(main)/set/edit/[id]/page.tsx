import { useRouter } from "next/router"
import {Input} from "@/components/ui/input";
interface SetPageProps {
    params: {
        id: number;
    };
}
const SetEditPage = ({ params }: SetPageProps) => {


    return (
        <div className={"mt-24"}>
            <h2 className={"text-4xl"}>Edit a new flashcards set</h2>

            <div className={"mt-10"}>
                <Input className={"text-3xl h-14"} placeholder={"Name"} value={"A new set"} />
            </div>

            <div className={"flex flex-col gap-4 mt-10"}>
                <div className={" w-full rounded-2xl pb-4"}>
                    <div className={"border-b py-3 px-7 "}>
                        <span className={"font-bold"}>1</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SetEditPage