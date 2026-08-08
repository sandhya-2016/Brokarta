import { z } from "zod";

export const connectSchema = z.object({
  userType: z.string().min(1, "Please select a user type"),
  lookingFor: z.string().min(1, "Please select what you are looking for"),

  name: z
    .string()
    .min(1, "Please enter your full name")
    .min(3, "Name must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),

  phone: z
    .string()
    .min(1, "Please enter your phone number")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),

  withCompany: z.string().optional(),
  firstName: z.string().optional(),
  companyName: z.string().optional(),
  role: z.string().optional(),
  query: z.string().max(500).optional(),
});