// this dynamic API route will be used to fetch
// a specific user's filtered stats

import { NextApiRequest, NextApiResponse } from "next";
import { Muscle_grp, Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log("req:", req);
  // /api/stats/[username/muscleGrp].ts
  // console.log("req.query:", req.query);
  const { musclefilter } = req.query;
  // console.log("musclefilter:", musclefilter);
  const username = musclefilter![0];
  const muscleGrp: Muscle_grp = musclefilter![1].toUpperCase() as Muscle_grp;
  console.log(username, muscleGrp);

  // check if username is not undefined and is in correct format
  if (username && typeof username === "string") {
    try {
      // fetch all of user's exercise stats
      const getStats = await prisma.exercise_stat.findMany({
        where: {
          AND: [
            {
              user: {
                username: {
                  equals: username,
                },
              },
              muscleGroup: {
                equals: muscleGrp,
              },
            },
            {
              AND: { userName: { equals: username } },
              OR: [
                { creatorName: { equals: username } },
                { creatorName: { equals: "admin" } },
              ],
            },
          ],
        },
      });
      // console.log("getStats:", getStats);
      // console.log("getStats:", getStats.length);
      // console.log("typeof getStats:", typeof getStats);
      // check if user has saved exercise stats and return it
      // if no saved states for that specific muscle group, return empty array
      if (getStats.length) {
        return res.status(200).send(getStats);
      } else {
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
  // return res.status(200).send([]);
  return res.status(400).send("Invalid request.");
}
