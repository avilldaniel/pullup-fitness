// API route used to delete an individual exercise stat
// needs username (which will be pulled from Context)
// return object of exercise stat that was deleted
// onMutation setQueryData:
// queryData.filter(stat => {
// stat.exerciseName !== deleted.exerciseName
// && stat.creatorName !== deleted.creatorName)}

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, muscleGrp, exerciseName, creatorName } = req.body;

  try {
    // Delete exercise stat
    const objectDeleted = await prisma.exercise_stat.delete({
      where: {
        userName_exerciseName_creatorName_muscleGroup: {
          userName: username,
          exerciseName: exerciseName,
          creatorName: creatorName,
          muscleGroup: muscleGrp,
        },
        // userName_exerciseName_creatorName: {
        //   userName: username,
        //   exerciseName: exerciseName,
        //   creatorName: creatorName,
        // },
      },
    });

    // If creatorName !== "admin", delete the actual exercise itself
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

    // Return deleted stat as an object
    return res.status(200).send(objectDeleted);
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
