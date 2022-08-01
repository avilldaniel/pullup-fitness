// dynamic API route that fetches exercises based on the passed in muscle group AND has "admin" as creator
// fetch all exercises, then get difference between muscleExercises vs filteredArr, then return that
import { Muscle_grp } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);
  const { modalfilter } = req.query;
  console.log(modalfilter);
  const username = modalfilter![0];
  // const muscleGrp: Muscle_grp = modalfilter![1] as Muscle_grp;
  const muscleGrp: Muscle_grp = modalfilter![1].toUpperCase() as Muscle_grp;

  try {
    // get all exercises
    const muscleExercises = await prisma.exercise.findMany({
      where: {
        AND: [
          { creator: { equals: "admin" } },
          { muscleGrp: { equals: muscleGrp } },
        ],
      },
    });
    console.log("muscleExercises:", muscleExercises);

    // get user's exercises
    const userExercises = await prisma.exercise.findMany({
      where: {
        exerciseStats: {
          some: {
            userName: { equals: username },
          },
        },
      },
    });
    console.log("userExercises:", userExercises);

    // get difference of the two arrays, return it

    return res.status(420).send("testing");
  } catch (e) {
    console.error(e);
  }
  return res.status(400).send("query did not work");
}
