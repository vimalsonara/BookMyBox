"use server";

import { extendedBookingFormSchema } from "@/app/booking/page";
import { extendedBoxFormSchema } from "@/app/box/page";
import { db } from "@/db";
import { booking, box } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type NewBox = z.infer<typeof extendedBoxFormSchema>;

type NewBooking = z.infer<typeof extendedBookingFormSchema>;

// add box
export const addBox = async (data: NewBox) => {
  const newBox = await db
    .insert(box)
    .values({
      id: data.id,
      boxName: data.boxName,
      userId: data.userId,
    })
    .returning();

  revalidatePath("/");
  if (!newBox) return { error: "Error while creating box" };
  if (newBox[0].id) return { success: newBox };
};

// list all box
export const fetchBox = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const data = await db.query.box.findMany({
    where: eq(box.userId, userId),
  });

  return { success: data };
};

// add booking
export const addBooking = async (data: NewBooking) => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const newBooking = await db
    .insert(booking)
    .values({
      id: data.id,
      boxId: data.boxId,
      customerName: data.customerName,
      userId: userId,
    })
    .returning();

  if (!newBooking) return { error: "Error while creating booking" };
  if (newBooking[0].id)
    return {
      success: newBooking,
    };
};
