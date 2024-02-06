"use server";

import { db } from "@/db";
import { booking, box, customer } from "@/db/schema";
import {
  newBoxFormSchema,
  newBookingFormSchema,
  newCustomerSchema,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs";
import { and, count, desc, eq, sum } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
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

    if (!newBox) return { error: "Error while creating box" };
    if (newBox[0]) {
      revalidatePath("/");
      return { success: newBox };
    }
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
      if (newCustomer[0]) {
        revalidatePath("/");
        return { success: newCustomer };
      }
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

      if (newBooking[0].id) {
        revalidatePath("/");
        return {
          success: newBooking,
        };
      }
    }
  }
};

// last 10 booking
export const listBooking = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const data = await db
    .select({
      bookingId: booking.id,
      box: box.boxName,
      customerName: customer.customerName,
      customerNumber: customer.customerNumber,
      price: booking.price,
      bookingDate: booking.bookingDate,
      bookingStartTime: booking.bookingStartTime,
      bookingEndTime: booking.bookingEndTime,
    })
    .from(booking)
    .leftJoin(customer, eq(booking.customerId, customer.id))
    .leftJoin(box, eq(booking.boxId, box.id))
    .where(eq(booking.userId, userId))
    .orderBy(desc(booking.createdAt))
    .limit(10);

  if (data.length > 0) {
    return { success: data };
  } else {
    return { error: "No booking found" };
  }
};

// today's total collection
export const todayTotalCollection = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const today = format(new Date(), "yyyy-MM-dd");

  const data = await db
    .select({ total: sum(booking.price) })
    .from(booking)
    .where(and(eq(booking.userId, userId), eq(booking.bookingDate, today)));

  if (data[0].total) {
    return { success: data[0].total };
  } else {
    return { error: "No booking found" };
  }
};

// today's total booking
export const todayTotalBooking = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const today = format(new Date(), "yyyy-MM-dd");

  const data = await db
    .select({ total: count(booking.id) })
    .from(booking)
    .where(and(eq(booking.userId, userId), eq(booking.bookingDate, today)));

  if (data[0].total) {
    return { success: data[0].total };
  } else {
    return { error: "No booking found" };
  }
};

// current week's total collection
export const currentWeekTotalCollection = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  // let curr = new Date();
  // let week = [];

  // for (let i = 1; i <= 7; i++) {
  //   let first = curr.getDate() - curr.getDay() + i;
  //   let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
  //   week.push(day);
  // }

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);

  const week: string[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(sevenDaysAgo);
    currentDate.setDate(sevenDaysAgo.getDate() + i);

    const formattedDate = currentDate.toISOString().split("T")[0];
    week.push(formattedDate);
  }

  const data = await db
    .select()
    .from(booking)
    .where(and(eq(booking.userId, userId)));

  const totalBookingPerDay = week.map((day) => {
    const bookingForDay = data.filter((booking) => booking.bookingDate === day);
    const totalAmount = bookingForDay.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
    return { date: day, total: totalAmount };
  });

  if (totalBookingPerDay.length > 0) {
    return { success: totalBookingPerDay };
  } else {
    return { error: "No booking found" };
  }
};

// total collection
export const totalCollection = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const data = await db
    .select({ total: sum(booking.price) })
    .from(booking)
    .where(eq(booking.userId, userId));

  if (data[0].total) {
    return { success: data[0].total };
  } else {
    return { error: "No booking found" };
  }
};

// total booking
export const totalBooking = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const data = await db
    .select({ total: count(booking.id) })
    .from(booking)
    .where(eq(booking.userId, userId));

  if (data[0].total) {
    return { success: data[0].total };
  } else {
    return { error: "No booking found" };
  }
};

// total customer
export const totalCustomer = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const data = await db
    .select({ total: count(customer.id) })
    .from(customer)
    .where(eq(customer.userId, userId));

  if (data[0].total) {
    return { success: data[0].total };
  } else {
    return { error: "No customer found" };
  }
};

// total box
export const totalBox = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const data = await db
    .select({ total: count(box.id) })
    .from(box)
    .where(eq(box.userId, userId));

  if (data[0].total) {
    return { success: data[0].total };
  } else {
    return { error: "No box found" };
  }
};

// list all booking
export const listAllBooking = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const data = await db
    .select({
      bookingId: booking.id,
      box: box.boxName,
      customerName: customer.customerName,
      customerNumber: customer.customerNumber,
      price: booking.price,
      bookingDate: booking.bookingDate,
      bookingStartTime: booking.bookingStartTime,
      bookingEndTime: booking.bookingEndTime,
    })
    .from(booking)
    .leftJoin(customer, eq(booking.customerId, customer.id))
    .leftJoin(box, eq(booking.boxId, box.id))
    .where(eq(booking.userId, userId))
    .orderBy(desc(booking.createdAt));

  if (data.length > 0) {
    return { success: data };
  } else {
    return { error: "No booking found" };
  }
};

// list all customer
export const listAllCustomer = async () => {
  const { userId } = auth();

  if (!userId) return { error: "User not authenticated" };

  const data = await db
    .select()
    .from(customer)
    .where(eq(customer.userId, userId));

  if (data.length > 0) {
    return { success: data };
  } else {
    return { error: "No customer found" };
  }
};
