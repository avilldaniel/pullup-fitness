import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { prisma } from "../../utils/db";
import { userSchema } from "../../schemas/zodUserSchema";
import { Prisma } from "@prisma/client";

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
    // console.log("user after initial Zod parse:", user);

    // if data passes validation, invoke db query with it
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        username: user.username,
      },
    });

    return res.status(200).send(JSON.stringify(newUser));
  } catch (e) {
    // handle error when data does not conform to Zod schema
    // error handling is taken from Zod's docs
    if (e instanceof z.ZodError) {
      console.log(e.issues);
      return res.status(400).send(e.issues);
    }

    // handle error when invalid data is used in prisma schema query
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation. A new user cannot be created."
        );
        return res.status(401).send(e.meta);
      }
    }
    // return res.status(400).send(e);
  }
}
