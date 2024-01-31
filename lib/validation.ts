import { z } from "zod";

export const newBoxFormSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID" }),
  boxName: z
    .string()
    .min(1)
    .max(20, { message: "Box name must be between 1 and 20 characters" }),
  userId: z.string({
    required_error: "Invalid user ID",
  }),
});

export const newBookingFormSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID" }),
  boxId: z
    .string({
      required_error: "Invalid box ID",
      invalid_type_error: "Invalid box ID",
    })
    .nonempty({ message: "Please select box" }),
  customerName: z
    .string()
    .min(3)
    .max(20, { message: "Customer name must be between 3 and 20 characters" }),
  userId: z.string({
    required_error: "Invalid user ID",
  }),
});
