import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const box = sqliteTable("box", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId").notNull(),
  boxName: text("boxName", { length: 20 }).notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const customer = sqliteTable("customer", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId").notNull(),
  customerName: text("customerName").notNull(),
  customerNumber: text("customerNumber", { length: 10 }).notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const booking = sqliteTable("booking", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId").notNull(),
  boxId: text("boxId")
    .notNull()
    .references(() => box.id),
  customerId: text("customerId")
    .notNull()
    .references(() => customer.id),
  price: integer("price").notNull(),
  bookingDate: text("bookingDate").notNull(),
  bookingStartTime: text("bookingStartTime").notNull(),
  bookingEndTime: text("bookingEndTime").notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
