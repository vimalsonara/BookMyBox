"use server";

import { db } from "@/db";
import { booking, box, customer } from "@/db/schema";
import {
  newBoxFormSchema,
  newBookingFormSchema,
  newCustomerSchema,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type NewBox = z.infer<typeof newBoxFormSchema>;

type NewBooking = z.infer<typeof newBookingFormSchema>;

type NewCustomer = z.infer<typeof newCustomerSchema>;

// add box
export const addBox = async (data: NewBox) => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const parsedData = newBoxFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: parsedData.error.message };
  } else {
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
  }
};

// list all box
export const fetchBox = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const data = await db.query.box.findMany({
    where: eq(box.userId, userId),
  });

  if (data.length > 0) {
    return { success: data };
  } else {
    return { error: "No box found" };
  }
};

// add customer
export const addCustomer = async (data: NewCustomer) => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const parsedData = newCustomerSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: parsedData.error.message };
  } else {
    const customerExists = await db
      .select()
      .from(customer)
      .where(
        and(
          eq(customer.userId, userId),
          eq(customer.customerNumber, data.customerNumber),
        ),
      );

    if (customerExists.length > 0) {
      return { error: "Customer with same number already exists" };
    } else {
      const newCustomer = await db
        .insert(customer)
        .values({
          id: data.id,
          customerName: data.customerName,
          customerNumber: data.customerNumber,
          userId: data.userId,
        })
        .returning();
      if (!newCustomer) return { error: "Error while creating customer" };
      if (newCustomer[0].id) return { success: newCustomer };
    }
  }
};

// list customer
export const fetchCustomer = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const data = await db.query.customer.findMany({
    where: eq(customer.userId, userId),
  });

  if (data.length > 0) {
    return { success: data };
  } else {
    return { error: "No customer found" };
  }
};

// add booking
export const addBooking = async (data: NewBooking) => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const parsedData = newBookingFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: parsedData.error.message };
  } else {
    const existingBooking = await db
      .select()
      .from(booking)
      .where(
        and(
          eq(booking.boxId, data.boxId),
          eq(booking.bookingDate, data.bookingDate),
          eq(booking.bookingStartTime, data.bookingStartTime),
        ),
      );

    if (existingBooking.length > 0) {
      return { error: "This slot is already booked" };
    } else {
      const newBooking = await db
        .insert(booking)
        .values({
          id: data.id,
          boxId: data.boxId,
          customerId: data.customerId,
          userId: data.userId,
          price: data.price,
          bookingDate: data.bookingDate,
          bookingStartTime: data.bookingStartTime,
          bookingEndTime: data.bookingEndTime,
        })
        .returning();

      if (!newBooking) return { error: "Error while creating booking" };

      if (newBooking[0].id)
        return {
          success: newBooking,
        };
    }
  }
};
