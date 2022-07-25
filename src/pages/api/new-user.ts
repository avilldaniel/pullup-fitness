import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { prisma } from "../../utils/db";
import { userSchema, Schema } from "../../schemas/zodUserSchema";

// model User {
//   id              Int               @id @default(autoincrement())
//   memberSince     DateTime          @default(now())
//   username        String            @db.VarChar(50) @unique
//   email           String            @db.VarChar(50) @unique
//   name            String?           @db.VarChar(50)
//   exerciseStats   Exercise_stats[]
//   workouts        Workout[]
//   @@index([username])
// }
// export const schema = z.object({
//   email: z.string().email().trim().max(50, "Email cannot exceed 50 characters"),
//   name: z
//     .string()
//     .min(1, "Name must be at least 1 character")
//     .max(50, "Name cannot exceed 50 characters")
//     .optional(),
//   username: z
//     .string()
//     .min(5, "Username must be at least 5 characters")
//     .max(50, "Username cannot exceed 50 characters"),
// });
// type Schema = z.infer<typeof schema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // test if data in request is valid and formatted
  try {
    const user = userSchema.parse(req.body);
    res.send(user);

    // if data passes validation, invoke db query with it
    postUser(user);
  } catch (error) {
    // error handling is taken from Zod's docs
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      res.status(400).send(error.issues);
    }
  }
  // res.send(data);
  return;
  // res.status(200).send(data);
}

const postUser = async (user: Schema) => {
  console.log(user);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      username: user.username,
    },
  });
  console.log("newUser:", newUser);
};
