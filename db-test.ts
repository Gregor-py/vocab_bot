import "dotenv/config"
import {drizzle} from "drizzle-orm/neon-http"
import {neon} from "@neondatabase/serverless"

import * as schema from "./db/schema"
import {generationMeaningOptions, generationSettings, generationTranslationOptions, sets, userPreferences} from "./db/schema";
import {eq} from "drizzle-orm";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!)

const db = drizzle(sql, {schema})

const main = async () => {
    try {
        console.log("start")


        // const [translationOptionsReturning] = await db
        //     .insert(generationTranslationOptions)
        //     .values([{}])
        //     .returning({id: generationTranslationOptions.id})
        //
        // const [meaningOptionsReturning] = await db
        //     .insert(generationMeaningOptions)
        //     .values([{}])
        //     .returning({id: generationMeaningOptions.id})
        //
        // const [generationSettingsReturning] = await db
        //     .insert(generationSettings)
        //     .values([{
        //         generationTranslationOptionsId: translationOptionsReturning.id,
        //         generationMeaningOptionsId: meaningOptionsReturning.id
        //     }])
        //     .returning({id: generationSettings.id})
        //
        // await db.insert(userPreferences).values([{
        //     userId: "user_2n266STal2LeDdV0AOTxWfXUn2R",
        //     generationSettingsId: generationSettingsReturning.id
        // }])

        const data = await db.query.generationSettings.findFirst({
            where: eq(generationSettings.id, 1),
            with: {
                generationMeaningOptions: true,
                generationTranslationOptions: true
            }
        })

        console.log(data)
    } catch (error) {
        console.error(error)
        throw new Error("Failed")
    }
}

main()