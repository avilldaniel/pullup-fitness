import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { prisma } from "../../../utils/db";
import { userSchema } from "../../../schemas/zodSchemas";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Test if data in request is valid and formatted
  try {
    const user = userSchema.parse(req.body);

    // if data passes validation, invoke db query with it
    const newUser = await prisma.appUser.create({
      data: {
        email: user.email,
        name: user.name,
        username: user.username,
      },
    });

    return res.status(200).send(JSON.stringify(newUser));
  } catch (e) {
    // Handle error when data does not conform to Zod schema
    // error handling is taken from Zod's docs
    if (e instanceof z.ZodError) {
      console.log(e.issues);
      return res.status(400).send(e.issues);
    }

    // Handle error when invalid data is used in prisma schema query
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation. A new user cannot be created."
        );
        return res.status(400).send(e.meta);
      }
    }
    return res.status(400).send(e);
  }
}
