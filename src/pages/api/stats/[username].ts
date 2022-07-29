// this dynamic API route will be used to fetch
// a specific user's stats

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

// this dynamic API route will be used to fetch a specific user

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log("req:", req);
  // /api/stats/[username].ts
  const { username } = req.query;
  // console.log("username:", username);

  // check if username is not undefined and is in correct format
  if (username && typeof username === "string") {
    try {
      // fetch all of user's exercise stats
      const getStats = await prisma.exercise_stat.findMany({
        where: {
          user: {
            username: {
              equals: username,
            },
          },
        },
      });
      // console.log("getStats:", getStats);
      // console.log("getStats:", getStats.length);
      // console.log("typeof getStats:", typeof getStats);
      // check if user has saved exercise stats
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
