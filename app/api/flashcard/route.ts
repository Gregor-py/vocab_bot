import {NextRequest, NextResponse} from "next/server";
import {db} from "@/db";
import {flashcards, sets} from "@/db/schema";
import {auth} from "@clerk/nextjs/server";
import {eq} from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const {userId} = auth()

        if (!userId) {
            return NextResponse.json({message: "You need to be logged in."})
        }

        const body = await req.json(); // Important: Parse the request body
        const { setId, order } = body;

        const result = await db.insert(flashcards).values({
            setId,
            userId,
            order
        }).returning({flashcardId: flashcards.id})

        const flashcard = await db.query.flashcards.findFirst({
            where: eq(flashcards.id, result[0].flashcardId)
        })

        return NextResponse.json(flashcard)
    } catch (e) {
        console.error(e)
        NextResponse.error()
    }
}