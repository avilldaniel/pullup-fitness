// this dynamic API route will be used to fetch a specific user

import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // [login].ts
  const { login } = req.query;
  // console.log("login:", login);
  // check login is not undefined and is in correct format
  if (login && typeof login === "string") {
    try {
      // check if api query (login) matches with an existing user
      const getUser = await prisma.user.findFirstOrThrow({
        where: {
          // login === username || login === email
          OR: [{ email: { equals: login } }, { username: { equals: login } }],
        },
      });
      // console.log("getUser:", getUser);
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
