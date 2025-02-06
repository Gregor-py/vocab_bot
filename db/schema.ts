import {relations} from 'drizzle-orm';
import {boolean, integer, pgEnum, pgTable, serial, text} from 'drizzle-orm/pg-core';

export const setThemes = pgTable("set-themes", {
    id: serial("id").primaryKey(),
    mainText: text("main_text"),
    mainBg: text("main_bg"),
    innerBlockBg: text("inner_block_bg"),
    iconColor: text("icon_color"),
    innerBlockText: text("inner_block_text"),
    iconBgColor: text("icon_bg_color"),
})

export const sets = pgTable("sets", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").default("A new set"),
    setThemeId: integer("set_themes_id").references(() => setThemes.id, {onDelete: "cascade"}).notNull(),
    languageId: integer("language_id").references(() => languages.id).notNull(),
    generationSettingsId: integer("generation_settings_id").references(() => generationSettings.id),
    useMainGenerationSettings: boolean("use_main_generation_settings").default(true),
})

export const setsRelations = relations(sets, ({one, many}) => ({
    flashcards: many(flashcards),
    language: one(languages, {fields: [sets.languageId], references: [languages.id]}),
    setTheme: one(setThemes, {fields: [sets.setThemeId], references: [setThemes.id]})
}))

export const languages = pgTable("languages", {
    id: serial("id").primaryKey(),
    name: text("language").notNull()
})

export const flashcards = pgTable("flashcards", {
    id: serial("id").primaryKey(),
    order: integer("order").notNull().default(1),
    userId: text("user_id").notNull(),
    setId: integer("set_id").references(() => sets.id).notNull(),
    term: text("term").default(""),
    backSide: text("back_side").default(""),
})

export const userPreferences = pgTable("user-preferences", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    motherTongueId: integer("mother_tongue_id").references(() => languages.id),
    generationSettingsId: integer("generation_settings_id").references(() => generationSettings.id).notNull(),
})

export const userPreferencesRelation = relations(userPreferences, ({one}) => ({
    generationSettings: one(generationSettings, {
        fields: [userPreferences.generationSettingsId],
        references: [generationSettings.id]
    }),
    motherTongue: one(languages, {
        fields: [userPreferences.motherTongueId],
        references: [languages.id]
    })
}))

export const generationSettings = pgTable("generation-settings", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    generationTranslationOptionsId: integer("generation_translation_options_id").references(() => generationTranslationOptions.id),
    generationMeaningOptionsId: integer("generation_meaning_options_id").references(() => generationMeaningOptions.id),
})

export const generationSettingsRelation = relations(generationSettings, ({one}) => ({
    generationTranslationOptions: one(generationTranslationOptions, {
        fields: [generationSettings.generationTranslationOptionsId],
        references: [generationTranslationOptions.id]
    }),
    generationMeaningOptions: one(generationMeaningOptions, {
        fields: [generationSettings.generationMeaningOptionsId],
        references: [generationMeaningOptions.id]
    })
}))

export const difficultyEnum = pgEnum("difficulty", ["easy", "middle", "hard"])

export const generationTranslationOptions = pgTable("generation-translation-options", {
    id: serial("id").primaryKey(),
    order: integer("order").notNull().default(1),
    amount: integer("amount").default(1),
    difficulty: difficultyEnum("difficulty").default("easy").notNull(),
    isShown: boolean("isShown").default(false)
})

export const generationMeaningOptions = pgTable("generation-meaning-options", {
    id: serial("id").primaryKey(),
    order: integer("order").notNull().default(1),
    difficulty: difficultyEnum("difficulty").default("easy").notNull(),
    isShown: boolean("isShown").default(false)
})

export const flashcardsRelation = relations(flashcards, ({one}) => ({
    set: one(sets, {
        fields: [flashcards.setId],
        references: [sets.id]
    })
}))

// types

export type Flashcard = typeof flashcards.$inferSelect;
export type SetType = typeof sets.$inferSelect & {
    language: typeof languages.$inferSelect;
    flashcards: Flashcard[];
};