// API route used to update a row in user's exercise stats
// needs username (Context), exercisename, creatorName,
// newWight, newSets, and newReps
// return object of exercise stat that was updated

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
  const session = unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  const {
    username,
    muscleGrp,
    creatorName,
    exerciseName,
    newWeight,
    newSets,
    newReps,
  } = req.body;

  // Format
  const newWeightDeci = new Prisma.Decimal(newWeight);
  const parsedSets = parseInt(newSets);
  const parsedReps = parseInt(newReps);

  try {
    const objectUpdated = await prisma.exercise_stat.update({
      where: {
        userName_exerciseName_creatorName_muscleGroup: {
          userName: username,
          exerciseName: exerciseName,
          creatorName: creatorName,
          muscleGroup: muscleGrp,
        },
      },
      data: {
        weight: newWeightDeci,
        sets: parsedSets,
        reps: parsedReps,
      },
    });

    // Return updated stat as an object
    return res.status(200).send(objectUpdated);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log("Can't update record.");
        return res.status(400).send(e.meta);
      }
    }
    return res.status(401).send(e);
  }
}
