import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const box = sqliteTable("box", {
  id: text("id").notNull().primaryKey(),
  boxName: text("boxName", { length: 20 }).notNull(),
  userId: text("userId").notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const booking = sqliteTable("booking", {
  id: text("id").notNull().primaryKey(),
  boxId: text("boxId")
    .notNull()
    .references(() => box.id),
  customerName: text("customerName").notNull(),
  userId: text("userId").notNull(),
  price: integer("price").notNull(),
  bookingDate: text("bookingDate").notNull(),
  bookingStartTime: text("bookingStartTime").notNull(),
  bookingEndTime: text("bookingEndTime").notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
