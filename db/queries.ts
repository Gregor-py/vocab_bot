import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import {db} from "@/db/index";
import {and, eq} from "drizzle-orm";
import {flashcards, sets} from "@/db/schema";

export const getUsersSets = cache(async () => {
    const {userId} = auth()

    if (!userId) {
        throw new Error()
    }

    return db.query.sets.findMany({
        where: eq(sets.userId, userId),
        with: {
            setTheme: true,
            language: true,
            flashcards: true
        }
    })
})

export const getFlashcardsBySet = cache(async (setId: number) => {
    const {userId} = auth();

    if (!userId) {
        throw new Error()
    }

    return db.query.flashcards.findMany({
        where: eq(flashcards.setId, setId),
        orderBy: flashcards.order
    })
})

export const getSetById = cache(async (setId: number) => {
    const {userId} = auth();

    if (!userId) {
        throw new Error()
    }

    return db.query.sets.findFirst({
        where: and(eq(sets.id, setId), eq(sets.userId, userId)),
        with: {
            setTheme: true,
            language: true,
            flashcards: true
        }
    })
})



export const getFlashcardById = async (flashcardId: number) => {
    return db.query.flashcards.findFirst({
        where: eq(flashcards.id, flashcardId)
    })
}