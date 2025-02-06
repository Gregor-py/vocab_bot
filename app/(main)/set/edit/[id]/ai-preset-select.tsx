"use client"

import {Option, Select} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

interface Props {
}

export const AiPresetSelect = ({}: Props) => {
    const options: Option[] = [
        {value: '1', label: 'For English cards'},
        {value: '2', label: 'For German cards'},
        {value: '3', label: 'additional examples'}
    ]

    return <Select
        options={options}
        noOptionsMessage={() => {
            return (
                <div className={"flex flex-wrap gap-4 justify-between"}>
                    <span>There is no ai-preset with this name </span>
                    <Button className={"text-lg"} size={"sm"}>Create new one</Button>
                </div>
            )
        }}
    />
}