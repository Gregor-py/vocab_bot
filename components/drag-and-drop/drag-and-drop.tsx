"use client"

import { useEffect } from 'react'
import {createSwapy} from "swapy";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

function Item ({item}: {item: string}) {
    return (
        <div className="px-16 py-5 bg-neutral-800 rounded-2xl my-3 cursor-move" data-swapy-item={item}>
            <div>{item}</div>
            <Button>Change</Button>
            <Input />
        </div>
    )
}


export const Swapy = () => {
    const slotItems = ["a", "b", "c", "d"]

    useEffect(() => {
        const container = document.querySelector('.container')!
        const swapy = createSwapy(container, {
            swapMode: 'hover'
        })
        swapy.onSwap(({ data }) => {
            console.log('swap', data);
            localStorage.setItem('slotItem', JSON.stringify(data.object))
        })

        swapy.onSwapEnd(({ data, hasChanged }) => {
            console.log(hasChanged);
            console.log('end', data);
        })

        swapy.onSwapStart(() => {
            console.log('start')
        })

        return () => {
            swapy.destroy()
        }
    }, [])

    return (
        <div className="container">
            <div data-swapy-slot="1">
                <Item item={slotItems[0]}/>
            </div>
            <div data-swapy-slot="2">
                <Item item={slotItems[1]}/>
            </div>
            <div data-swapy-slot="3">
                <Item item={slotItems[2]}/>
            </div>
            <div data-swapy-slot="4">
                <Item item={slotItems[3]}/>
            </div>
        </div>
    )
}