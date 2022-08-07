// API route used to update a row in user's exercise stats
// needs username (Context), exercisename, creatorName,
// newWight, newSets, and newReps
// return object of exercise stat that was updated

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // useContext(username)
  const { username, creatorName, exerciseName, newWeight, newSets, newReps } =
    req.body;

  try {
    const objectUpdated = await prisma.exercise_stat.update({
      where: {
        userName_exerciseName_creatorName: {
          userName: username,
          exerciseName: exerciseName,
          creatorName: creatorName,
          // creatorName: username || "admin",
        },
      },
      data: {
        weight: newWeight,
        sets: newSets,
        reps: newReps,
      },
    });

    // return updated stat as an object
    return res.status(200).send(objectUpdated);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log("Can't update record.");
        return res.status(400).send(e.meta);
      }
    }
    return res.status(400).send(e);
  }
}
