// API route used to add to the list of a user's exercise stats
// needs username (Global Context), muscleGrp (Local Context), exerciseName, creatorName ("admin" || username)
// if from preset list, return array of that stats that were added
// if a custom exercise, return object of custom stat that was added

import { NextApiRequest, NextApiResponse } from "next";
import { Exercise_stat, Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, muscleGroup, newExers, creatorName } = req.body;
  // If adding from preset exercises, newExers === []
  if (Array.isArray(newExers) && typeof username === "string") {
    for (let i = 0; i < newExers.length; i++) {
      try {
        // create new presets[] records in db
        await prisma.exercise_stat.create({
          data: {
            userName: username,
            exerciseName: newExers[i],
            creatorName: creatorName,
            muscleGroup: muscleGroup,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            console.log("Can't create exercises.");
            return res.status(400).send(e.meta);
          }
        }
        return res.status(400).send(e);
      }
    }

    // Fetch all of user's updated exercise stats
    let arrayAdded: Exercise_stat[] = [];
    for (let i = 0; i < newExers.length; i++) {
      try {
        // create new presets[] records in db
        const addedStat = await prisma.exercise_stat.findUniqueOrThrow({
          where: {
            userName_exerciseName_creatorName: {
              userName: username,
              exerciseName: newExers[i],
              creatorName: creatorName,
            },
          },
        });
        console.log({ addedStat });
        arrayAdded.push(addedStat);
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            console.log("Can't create exercises.");
            return res.status(400).send(e.meta);
          }
        }
        return res.status(400).send(e);
      }
    }

    // Return updated array of stats
    return res.status(200).send(arrayAdded);
  }

  // If adding a custom exercise, newExers === "string"
  else if (typeof newExers === "string") {
    if (typeof username === "string") {
      try {
        // Create new custom exercises record in db,
        // then create it as a new exercise stat (w/ default stats)
        await prisma.exercise.create({
          data: {
            name: newExers,
            muscleGrp: muscleGroup,
            creator: username,
          },
        });
        await prisma.exercise_stat.create({
          data: {
            userName: username,
            exerciseName: newExers,
            creatorName: username,
            muscleGroup: muscleGroup,
          },
        });

        // Fetch all of user's updated exercise stats
        const objectAdded = await prisma.exercise_stat.findUniqueOrThrow({
          where: {
            userName_exerciseName_creatorName: {
              userName: username,
              exerciseName: newExers,
              creatorName: creatorName,
            },
          },
        });

        // Return created stat as an array of size 1
        return res.status(200).send([objectAdded]);
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            console.log("Can't create exercise.");
            return res.status(400).send(e.meta);
          }
        }
        return res.status(400).send(e);
      }
    }
  }
  return res.status(400).send("Invalid request");
}
