import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import {db} from "@/db/index";
import {eq} from "drizzle-orm";
import {sets} from "@/db/schema";

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