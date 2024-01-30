"use server";

import { db } from "@/db";
import { booking, box } from "@/db/schema";
import { newBoxFormSchema, newBookingFormSchema } from "@/lib/validation";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type NewBox = z.infer<typeof newBoxFormSchema>;

type NewBooking = z.infer<typeof newBookingFormSchema>;

// add box
export const addBox = async (data: NewBox) => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const parsedData = newBoxFormSchema.safeParse(data);

  if (!parsedData.success) return { error: parsedData.error.message };

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

  const parsedData = newBookingFormSchema.safeParse(data);

  if (!parsedData.success) return { error: parsedData.error.message };

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
