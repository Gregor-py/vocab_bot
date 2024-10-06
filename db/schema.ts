import { relations } from 'drizzle-orm';
import {integer, pgEnum, pgTable, serial, text, uniqueIndex, varchar} from 'drizzle-orm/pg-core';

export const setThemes = pgTable("set-themes", {
    id: serial("id").primaryKey(),
    mainText: text("main_text"),
    mainBg: text("main_bg"),
    innerBlockBg: text("inner_block_bg"),
    iconColor: text("icon_color"),
    inner_block_text: text("inner_block_text"),
    icon_bg_color: text("icon_bg_color"),
})

export const sets = pgTable("sets", {
    id: serial("id").primaryKey(),
    name: text("name").default("A new set"),
    setThemeId: integer("set_themes_id").references(() => setThemes.id, {onDelete: "cascade"}).notNull(),
    learnedLanguageId: integer("learned_language_id").references(() => languages.id).notNull(),
})

export const setsRelations = relations(sets, ({one, many}) => ({
    setTheme: one(setThemes),
    flashCards: many(flashCards),
    learnedLanguage: one(languages)
}))

export const languages = pgTable("languages", {
    id: serial("id").primaryKey(),
    name: text("language").notNull()
})

export const flashcardsTypesEnum = pgEnum('flash-cards-type', ['structured, unstructured'])

export const flashCards = pgTable("flash_cards", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    type: flashcardsTypesEnum('type'),
    setId: integer("set_id").references(() => sets.id).notNull(),
    word: text("word"),
    translations: text("translations"),
    examples: text("examples"),
    source: text("source"),
    definition: text("definition"),
    frontSide: text("front_side"),
    backSide: text("back_side"),
})

export const flashCardsRelation = relations(flashCards, ({one}) => ({
    set: one(sets, {
        fields: [flashCards.setId],
        references: [sets.id]
    })
}))