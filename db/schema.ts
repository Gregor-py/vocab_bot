import {relations} from 'drizzle-orm';
import {integer, pgTable, serial, text} from 'drizzle-orm/pg-core';

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

export const flashcardsRelation = relations(flashcards, ({one}) => ({
    set: one(sets, {
        fields: [flashcards.setId],
        references: [sets.id]
    })
}))

export type Flashcard = typeof flashcards.$inferSelect;