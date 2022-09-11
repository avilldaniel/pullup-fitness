// API route used to fetch a user's exercise stats
// using session's email, fetch stats
// return array of stats

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Session
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  const { username } = req.query;
  console.log({ username });
  if (username && typeof username === "string") {
    try {
      // Confirm username is a registered user
      await prisma.appUser.findFirstOrThrow({
        where: {
          username: {
            equals: username,
          },
        },
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
