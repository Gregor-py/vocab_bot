"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import {FolderPlus} from "lucide-react";

type Props = {
    children: React.ReactNode;
}

const MainLayout = ({children}: Props) => {
    const createSet = async () => {
        const set = await axios.post('/api/set')

        console.log(set)
    }

    return (
        <div className={"flex h-full"}>
            <div className={"w-[256px] border-accent border"}>
                <div>Vocab bot</div>
                <Button onClick={createSet}><FolderPlus className={"mr-2"}/>Start a new set</Button>
            </div>
            <main className={"flex-1"}>
                <div className={"max-w-[1120px] mx-auto"}>{children}</div>
            </main>
        </div>
    )
}

export default MainLayout;