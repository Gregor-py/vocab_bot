import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/db";
import {flashcards} from "@/db/schema";
import {eq} from "drizzle-orm";

type Params = {
    id: number;
}

export async function GET(req: NextRequest, {params}: {params: Params}) {
    try {
        const {userId} = auth()

        if (!userId) {
            return NextResponse.json({message: "You need to be logged in."})
        }

        const initialFlashcards = await db.query.flashcards.findMany({
            where: eq(flashcards.setId, params.id),
            orderBy: flashcards.order
        })

        return NextResponse.json({initialFlashcards})
    } catch (e) {
        console.error(e)
        NextResponse.error()
    }
}