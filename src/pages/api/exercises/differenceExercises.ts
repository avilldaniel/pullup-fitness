// API route used to get difference between preset exercises and user's exercises
// return array of exercises

import { NextApiRequest, NextApiResponse } from "next";
import { Muscle_grp, Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, muscleGrp } = req.query;
  // const { username, muscleGrp } = req.body;

  try {
    if (typeof username === "string" && muscleGrp) {
      // get all exercises
      const muscleExercises = await prisma.exercise.findMany({
        where: {
          AND: [
            { creator: { equals: "admin" } },
            { muscleGrp: { equals: muscleGrp as Muscle_grp } },
            // { muscleGrp: { equals: muscleGrp.toUpperCase() as Muscle_grp } },
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
      // console.log("diffArray:", diffArray);

      // return array of stats
      return res.status(200).send(diffArray);
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log("Can't fetch user.");
        return res.status(400).send(e.meta);
      }
    }

    // username may not be registed
    return res.status(400).send("Invalid request.");
  }
}
// // API route used to get difference between preset exercises and user's exercises
// // return array of exercises

// import { NextApiRequest, NextApiResponse } from "next";
// import { Muscle_grp, Prisma } from "@prisma/client";
// import { prisma } from "../../../utils/db";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { username, muscleGrp } = req.query;
//   console.log("req.body:", req.body);
//   console.log("req.query:", req.query);

//   try {
//     // get all exercises
//     const muscleExercises = await prisma.exercise.findMany({
//       where: {
//         AND: [
//           { creator: { equals: "admin" } },
//           { muscleGrp: { equals: muscleGrp! as Muscle_grp } },
//           // { muscleGrp: { equals: muscleGrp.toUpperCase() as Muscle_grp } },
//         ],
//       },
//     });
//     console.log("muscleExercises:", muscleExercises);

//     // get user's exercises
//     const userExercises = await prisma.exercise.findMany({
//       where: {
//         exerciseStats: {
//           some: {
//             userName: { equals: username },
//           },
//         },
//       },
//     });
//     console.log("userExercises:", userExercises);

//     // get difference of the two arrays of objects, return it
//     const diffArray = muscleExercises.filter((muscExercise) => {
//       return !userExercises.some((userExercise) => {
//         return userExercise.id === muscExercise.id;
//       });
//     });
//     console.log("diffArray:", diffArray);

//     // return array of stats
//     return res.status(200).send(diffArray);
//   } catch (e) {
//     if (e instanceof Prisma.PrismaClientKnownRequestError) {
//       if (e.code === "P2002") {
//         console.log("Can't fetch user.");
//         return res.status(400).send(e.meta);
//       }
//     }

//     // username may not be registed
//     return res.status(400).send("Invalid request.");
//   }
// }
