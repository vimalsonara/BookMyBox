import { z } from "zod";

export const newBoxFormSchema = z.object({
  id: z.string().uuid(),
  boxName: z.string().min(1).max(20).toLowerCase(),
  userId: z.string(),
});

export const newBookingFormSchema = z.object({
  id: z.string().uuid(),
  boxId: z.string().uuid(),
  customerName: z.string().min(3).max(20).toLowerCase(),
  userId: z.string(),
});
