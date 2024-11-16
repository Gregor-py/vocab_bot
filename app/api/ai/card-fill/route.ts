import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import OpenAI from "openai";
import {getGeneratePrompt} from "@/app/api/ai/card-fill/prompt";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const openai = new OpenAI({
    apiKey: apiKey,
});

export async function PUT(req: NextRequest) {
    try {
        const {userId} = auth()

        if (!userId) {
            return NextResponse.json({message: "You need to be logged in."})
        }

        const {term, language} = await req.json()

        console.log(term, language)

        if (!term || !language) {
            return NextResponse.json({message: "You need to have term and language"})
        }

        const completion = await openai.chat.completions.create({
            messages: [
                {role: "system", content: "You are a helpful assistant."},
                {role: "user", content: getGeneratePrompt(term, language)},
            ],
            model: "gpt-4o-mini",
            response_format: {"type": "json_object"}
        });

        const output = completion.choices[0].message.content

        if (!output) {
            return NextResponse.json({message: "No response"})
        }

        const generatedJson = JSON.parse(output)

        console.log(generatedJson)

        if (!generatedJson) {
            return new NextResponse("Something went wrong", {status: 400});
        }

        const backSide = `<p><b>Definition</b></p><p>${generatedJson.definition}</p><p></p><p><b>Examples</b></p><p>${generatedJson.examples}</p>`

        return NextResponse.json({backSide})
    } catch (e) {
        console.error(e)
        NextResponse.error()
    }
}