import * as z from "zod";

export const userSchema = z.object({
  email: z.string().email().trim().max(50, "Email cannot exceed 50 characters"),
  name: z
    .string()
    .min(1, "Name must be at least 1 character")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
  // .optional(),
  username: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(50, "Username cannot exceed 50 characters")
    .trim(),
  // password
});

export type Schema = z.infer<typeof userSchema>;

// export const loginSchema = z.object({
//   // this can be user's email or username
//   login: z.string().trim(),
//   // password
// });

export const customExerSchema = z.object({
  customExer: z
    .string()
    .min(1, "Exercise must be at least 1 character")
    .max(30, "Exercise cannot exceed 50 characters")
    .trim(),
});
