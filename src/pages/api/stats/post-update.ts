// this API route will update a row in user's exercise stats

import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // destructure from request body
  const { username, exerciseName, newWeight, newSets, newReps } = req.body;
  // let updateStat;
  try {
    await prisma.exercise_stat.update({
      // updateStat = await prisma.exercise_stat.update({
      where: {
        userName_exerciseName: {
          userName: username,
          exerciseName: exerciseName,
        },
      },
      data: {
        weight: newWeight,
        sets: newSets,
        reps: newReps,
      },
    });
    // switch (field) {
    //   case "weight":
    //     // console.log("updating weight from API");
    //     updateStat = await prisma.exercise_stat.update({
    //       where: {
    //         userName_exerciseName: {
    //           userName: username,
    //           exerciseName: exerciseName,
    //         },
    //       },
    //       data: {
    //         weight: unit,
    //       },
    //     });
    //     break;
    //   case "sets":
    //     // console.log("updating sets from API");
    //     updateStat = await prisma.exercise_stat.update({
    //       where: {
    //         userName_exerciseName: {
    //           userName: username,
    //           exerciseName: exerciseName,
    //         },
    //       },
    //       data: {
    //         sets: unit,
    //       },
    //     });
    //     break;
    //   case "reps":
    //     // console.log("updating reps from API");
    //     updateStat = await prisma.exercise_stat.update({
    //       where: {
    //         userName_exerciseName: {
    //           userName: username,
    //           exerciseName: exerciseName,
    //         },
    //       },
    //       data: {
    //         reps: unit,
    //       },
    //     });
    //     break;
    //   default:
    //     return res.status(400).send("Invalid request.");
    // }
    const updatedArr = await prisma.exercise_stat.findMany({
      where: {
        user: {
          username: {
            equals: username,
          },
        },
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
