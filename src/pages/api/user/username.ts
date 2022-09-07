// API route used to fetch an email's username

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;
  if (email && typeof email === "string") {
    try {
      // Confirm email is a registered user, and get username
      const { username } = await prisma.appUser.findFirstOrThrow({
        where: {
          email: {
            equals: email,
          },
        },
        select: { username: true },
      });

      // Return username
      return res.status(200).json({ username: username });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          console.log("Can't fetch user.");
          return res.status(400).send(e.meta);
        }
      }

      // Username may not be registed
      return res.status(400).send("Invalid request.");
    }
  }
  return res.status(401).send("Invalid request.");
}
