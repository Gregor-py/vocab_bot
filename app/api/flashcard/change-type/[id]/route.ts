import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/db";
import {Flashcard, flashcards} from "@/db/schema";
import {eq} from "drizzle-orm";
import {getFlashcardById} from "@/db/queries";

type Params = {
    id: number;
}

const mergeFieldsIntoOne = ({definition, source, examples, translations}: Flashcard) => {
    return `${definition || ""}${translations || ""}${source || ""}${examples || ""}`;
}

export async function PUT(req: NextRequest, {params}: { params: Params }) {
    try {
        const {userId} = auth()

        if (!userId) {
            return NextResponse.json({message: "You need to be logged in."})
        }
        const flashCardId = params.id;
        const body = await req.json()

        const flashcard = await getFlashcardById(flashCardId)

        if (!flashcard) {
            return NextResponse.json({message: "Not found"})
        }

        if (body.type === "structured") {
            flashcard.word = flashcard.frontSide
            flashcard.definition = flashcard.backSide
        } else if (body.type === "unstructured") {
            const backSide = mergeFieldsIntoOne(flashcard)
            flashcard.frontSide = flashcard.word
            flashcard.backSide = backSide

            flashcard.word = ""
            flashcard.definition = ""
            flashcard.examples = ""
            flashcard.source = ""
        }

        console.log(body)

        flashcard.type = body.type !== "unstructured" && body.type !== "structured" ? "unstructured" : body.type

        console.log(flashcard)

        await db.update(flashcards).set(flashcard).where(eq(flashcards.id, params.id))

        return NextResponse.json({message: "success", flashcard})
    } catch (e) {
        console.error(e)
        NextResponse.error()
    }
}