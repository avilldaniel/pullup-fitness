// this API route will update a row in user's exercise stats

import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // destructure from request body
  const { username, creatorName, exerciseName, newWeight, newSets, newReps } =
    req.body;
  // let updateStat;
  try {
    await prisma.exercise_stat.update({
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

    const updatedArr = await prisma.exercise_stat.findMany({
      where: {
        // user: {
        //   username: {
        //     equals: username,
        //   },
        // },
        AND: { userName: { equals: username } },
        OR: [
          { creatorName: { equals: username } },
          { creatorName: { equals: "admin" } },
        ],
      },
    });
    console.log("updateStat:", updatedArr);
    return res.status(200).send(updatedArr);
    // return res.status(200).send(JSON.stringify(updateStat));
  } catch (e) {
    // handle error when invalid data is used in prisma schema query
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation. A record cannot be updated."
        );
        return res.status(400).send(e.meta);
      }
    }
    return res.status(400).send(e);
  }
}
