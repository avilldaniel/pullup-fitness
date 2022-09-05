// Dynamic API route used to fetch a specific user

import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // [login].ts
  const { login } = req.query;
  // Check login is not undefined and is in correct format
  if (login && typeof login === "string") {
    try {
      // Check if api query (login) matches with an existing user
      const getUser = await prisma.appUser.findFirstOrThrow({
        where: {
          // login === username || login === email
          OR: [{ email: { equals: login } }, { username: { equals: login } }],
        },
      });

      return res.status(200).send(getUser);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          console.log("Can't fetch user.");
          return res.status(400).send(e.meta);
        }
      }
      return res.status(400).send(e);
    }
  }
  return res.status(400).send("Invalid request.");
}
