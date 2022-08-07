// dynamic API route will create new exercise and add it to user's exercise_stats[] w/ default stats
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fetch params from slug
  const { username } = req.query;
  const { newExers, muscleGroup, creatorName } = req.body;

  // if adding from preset exercises
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

    // fetch all of user's updated exercise stats
    const getStats = await prisma.exercise_stat.findMany({
      where: {
        AND: { userName: { equals: username } },
        OR: [
          { creatorName: { equals: username } },
          { creatorName: { equals: "admin" } },
        ],
      },
    });

    // return updated array of stats
    return res.status(200).send(getStats);

    // for (let i = 0; i < newExers.length; i++) {
    //   try {
    //     // create new presets[] records in db
    //     await prisma.exercise_stat.create({
    //       data: {
    //         userName: username,
    //         exerciseName: newExers[i],
    //         creatorName: creatorName,
    //         muscleGroup: muscleGroup,
    //       },
    //     });

    //     // fetch all of user's updated exercise stats
    //     const getStats = await prisma.exercise_stat.findMany({
    //       where: {
    //         AND: { userName: { equals: username } },
    //         OR: [
    //           { creatorName: { equals: username } },
    //           { creatorName: { equals: "admin" } },
    //         ],
    //       },
    //     });

    //     // return updated array of stats
    //     return res.status(200).send(getStats);
    //   } catch (e) {
    //     if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //       if (e.code === "P2002") {
    //         console.log("Can't create exercises.");
    //         return res.status(400).send(e.meta);
    //       }
    //     }
    //     return res.status(400).send(e);
    //   }
    // }
  }

  // if adding a custom exercise
  else if (typeof newExers === "string") {
    if (typeof username === "string") {
      try {
        // create new custom exercises record in db
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

        // fetch all of user's updated exercise stats
        const getStats = await prisma.exercise_stat.findMany({
          where: {
            AND: { userName: { equals: username } },
            OR: [
              { creatorName: { equals: username } },
              { creatorName: { equals: "admin" } },
            ],
          },
        });

        // return updated array of stats
        return res.status(200).send(getStats);
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
