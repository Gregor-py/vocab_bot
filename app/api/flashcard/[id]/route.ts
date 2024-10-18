import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/db";
import {flashcards} from "@/db/schema";
import {eq} from "drizzle-orm";

type Params = {
    id: number;
}

export async function DELETE(req: NextRequest, {params}: {params: Params}) {
    try {
        const {userId} = auth()

        if (!userId) {
            return NextResponse.json({message: "You need to be logged in."})
        }

        await db.delete(flashcards).where(eq(flashcards.id, params.id))

        return NextResponse.json({message: "success"})
    } catch (e) {
        console.error(e)
        NextResponse.error()
    }
}

export async function PUT(req: NextRequest, {params}: {params: Params}) {
    try {
        const {userId} = auth()

        if (!userId) {
            return NextResponse.json({message: "You need to be logged in."})
        }

        const body = await req.json()

        console.log(body, "body", params)

        await db.update(flashcards).set(body).where(eq(flashcards.id, params.id))

        return NextResponse.json({message: "success"})
    } catch (e) {
        console.error(e)
        NextResponse.error()
    }
}