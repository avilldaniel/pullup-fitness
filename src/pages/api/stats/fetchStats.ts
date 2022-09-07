// API route used to fetch a user's exercise stats
// return array of stats

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
          // username: {
          //   equals: username,
          // },
          email: {
            equals: email,
          },
        },
        select: { username: true },
      });

      // Query db to fetch user's stats
      const getStats = await prisma.exercise_stat.findMany({
        where: {
          AND: { userName: { equals: username } },
          OR: [
            { creatorName: { equals: username } },
            { creatorName: { equals: "admin" } },
          ],
        },
      });

      // Return array of stats
      return res.status(200).send(getStats);
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
