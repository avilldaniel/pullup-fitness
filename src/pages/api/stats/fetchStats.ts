// API route used to fetch a user's exercise stats
// needs username (which will be pulled from Context)
// return array of stats

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // change this so that we get username from global state
  const { username } = req.query;
  // const { username } = req.body;
  // console.log("req.body:", req.body);
  // console.log("req.query", req.query);

  try {
    // query db to fetch user's stats
    const getStats = await prisma.exercise_stat.findMany({
      where: {
        AND: { userName: { equals: username as string } },
        OR: [
          { creatorName: { equals: username as string } },
          { creatorName: { equals: "admin" } },
        ],
      },
    });

    // return array of stats
    return res.status(200).send(getStats);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log("Can't fetch user.");
        return res.status(400).send(e.meta);
      }
    }

    // username may not be registed
    return res.status(400).send("Invalid request.");
  }
}
