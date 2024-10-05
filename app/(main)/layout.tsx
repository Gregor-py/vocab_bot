import { Button } from "@/components/ui/button";
import {FolderPlus} from "lucide-react";

type Props = {
    children: React.ReactNode;
}

const MainLayout = ({children}: Props) => {
    return (
        <div className={"flex h-full"}>
            <div className={"w-[256px] border-accent border"}>
                <div>Vocab bot</div>
                <Button><FolderPlus className={"mr-2"}/>Start a new set</Button>
            </div>
            <main className={"flex-1"}>
                <div className={"max-w-[1120px] mx-auto"}>{children}</div>
            </main>
        </div>
    )
}

export default MainLayout;