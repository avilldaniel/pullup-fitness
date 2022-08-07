// API route which will delete an individual exercise stat
// respone should return array of user's updated stats

import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserExerStats } from "../../../../db-queries/getUserExerStats";
import { prisma } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { creatorName, username, exerciseName, muscleGrp } = req.body;

  try {
    // delete exercise stat
    await prisma.exercise_stat.delete({
      where: {
        userName_exerciseName_creatorName: {
          userName: username,
          exerciseName: exerciseName,
          creatorName: creatorName,
        },
      },
    });

    // if creatorName !== "admin", delete the actual exercise itself
    if (creatorName !== "admin") {
      await prisma.exercise.delete({
        where: {
          name_muscleGrp_creator: {
            name: exerciseName,
            muscleGrp: muscleGrp,
            creator: creatorName,
          },
        },
      });
    }

    // return updated stats
    const stats = await getUserExerStats({ username });
    return res.status(200).send(stats);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log("Can't delete record.");
        return res.status(400).send(e.meta);
      }
    }
    return res.status(400).send(e);
  }
}
