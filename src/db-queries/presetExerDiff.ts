// block of code that queries db to help render exercises user can add
// returns admin-created exercises (preset) - user-created exercises

import { Muscle_grp } from "@prisma/client";
import { prisma } from "../utils/db";
import { IPresetExerDiff } from "../utils/types";

export const presetExerDiff = async ({
  username,
  muscleGrp,
}: IPresetExerDiff) => {
  // get all exercises
  const muscleExercises = await prisma.exercise.findMany({
    where: {
      AND: [
        { creator: { equals: "admin" } },
        { muscleGrp: { equals: muscleGrp.toUpperCase() as Muscle_grp } },
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

  return diffArray;
};
