"use client"

import {useRouter} from 'next/navigation'
import axios from "axios";
import {FolderPlus} from "lucide-react";
import {Button} from "@/components/ui/button";

export const CreateSetButton = () => {
    const router = useRouter()

    const createSet = async () => {
        const set = await axios.post<{setId: number}>('/api/set')

        router.push(`/set/edit/${set.data.setId}`)
    }

    return (
        <Button onClick={createSet}><FolderPlus className={"mr-2"}/>Start a new set</Button>
    )
}