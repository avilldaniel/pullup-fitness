import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { prisma } from "../../../utils/db";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name, username } = JSON.parse(req.body);
  try {
    const newUser = await prisma.appUser.create({
      data: {
        email,
        name,
        username,
      },
    });

    return res.status(200).json(newUser);
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
