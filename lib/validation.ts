import { z } from "zod";

export const boxFormSchema = z.object({
  id: z.string().uuid(),
  boxName: z.string().min(1).max(20).toLowerCase(),
});

export const extendedBoxFormSchema = boxFormSchema.extend({
  userId: z.string(),
});

export const bookingFormSchema = z.object({
  id: z.string().uuid(),
  boxId: z.string().uuid(),
  customerName: z.string().min(3).max(20).toLowerCase(),
});

export const extendedBookingFormSchema = bookingFormSchema.extend({
  userId: z.string(),
});
