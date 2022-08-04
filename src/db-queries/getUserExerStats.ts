// block of code that queries db to get all of user's exercise stats
// returns array of stats, primarily used for rendering table stats

import { prisma } from "../utils/db";
import { IGetUserExerStats } from "../utils/types";

export const getUserExerStats = async ({ username }: IGetUserExerStats) => {
  /// fetch all of user's exercise stats
  const getStats = await prisma.exercise_stat.findMany({
    where: {
      AND: { userName: { equals: username } },
      OR: [
        { creatorName: { equals: username } },
        { creatorName: { equals: "admin" } },
      ],
    },
  });

  return getStats;
};
