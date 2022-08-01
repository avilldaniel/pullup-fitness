// dynamic API route that fetches exercises based on the passed in muscle group AND has "admin" as creator
// fetch all exercises, then get difference between muscleExercises vs filteredArr, then return that
import { Muscle_grp, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);
  const { modalfilter } = req.query;
  // console.log(modalfilter);
  const username = modalfilter![0];
  const muscleGrp: Muscle_grp = modalfilter![1].toUpperCase() as Muscle_grp;

  if (req.method === "GET") {
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
      // console.log("muscleExercises:", muscleExercises);

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
      // console.log("userExercises:", userExercises);

      // get difference of the two arrays of objects, return it
      const diffArray = muscleExercises.filter((muscExercise) => {
        return !userExercises.some((userExercise) => {
          return userExercise.id === muscExercise.id;
        });
      });
      console.log("diffArray:", diffArray);
      return res.status(200).send(diffArray);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          console.log("Can't fetch user.");
          return res.status(400).send(e.meta);
        }
      }
      return res.status(400).send(e);
    }
  } else if (req.method === "POST") {
    console.log(
      "add new exercise to user's exercise stats, with the default stats"
    );
    console.log("okokok");
  }
  return res.status(400).send("Invalid request");
}
