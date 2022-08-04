// this dynamic API route will be used to fetch
// a specific user's stats

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // /api/stats/[username].ts
  const { username } = req.query;

  // check if username is not undefined and is in correct format
  if (username && typeof username === "string") {
    try {
      // fetch all of user's exercise stats
      const getStats = await prisma.exercise_stat.findMany({
        where: {
          AND: { userName: { equals: username } },
          OR: [
            { creatorName: { equals: username } },
            { creatorName: { equals: "admin" } },
          ],
        },
      });
      if (getStats.length) {
        return res.status(200).send(getStats);
      }
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
