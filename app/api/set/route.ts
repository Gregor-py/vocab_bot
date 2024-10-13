import { NextResponse } from "next/server";
import {db} from "@/db";
import {sets} from "@/db/schema";
import {auth} from "@clerk/nextjs/server";

export async function POST() {
    try {
        const {userId} = auth()

        if (!userId) {
            return NextResponse.json({message: "You need to be logged in."})
        }

        const set = await db.insert(sets).values({
            name: "A new set",
            setThemeId: 1,
            languageId: 1,
            userId: userId,
        }).returning({setId: sets.id})

        return NextResponse.json(set[0])
    } catch (e) {
        console.error(e)
        NextResponse.error()
    }
}