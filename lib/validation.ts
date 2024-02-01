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
  price: z.coerce
    .number()
    .lte(10000)
    .positive({ message: "Price must be positive" }),
  bookingDate: z
    .string({ required_error: "Booking date required" })
    .length(10, { message: "Booking date must be in DD-MM-YYYY format" }),
  bookingStartTime: z
    .string({ required_error: "Booking time required" })
    .min(5, { message: "Booking time must be in HH:MM format" })
    .max(5, { message: "Booking time must be in HH:MM format" }),
  bookingEndTime: z
    .string({ required_error: "Booking time required" })
    .min(5, { message: "Booking time must be in HH:MM format" })
    .max(5, { message: "Booking time must be in HH:MM format" }),
});
