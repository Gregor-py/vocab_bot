"use client"

import {Input} from "@/components/ui/input";
import {sets} from "@/db/schema";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import axios from "axios";

type Props = {
    set: typeof sets.$inferSelect
}

export const SetTitle = ({set}: Props) => {
    const [title, setTitle] = useState<string>(set.name || "")
    const [debouncedTitle] = useDebounce(title, 1000)

    const updateSet = (field: string, value: string) => {
        if (value) {
            axios.put(`/api/set/${set.id}`, { [field]: value })
                .then(response => {
                    console.log(`${field} updated:`, response.data);
                })
                .catch(error => {
                    console.error(`Error updating ${field}:`, error);
                });
        }
    };

    useEffect(() => {
        updateSet('name', debouncedTitle)
    }, [debouncedTitle])

    return (
        <Input className={"text-3xl h-14"} placeholder={"Name"} value={title} onChange={e => setTitle(e.target.value)} />
    )
}