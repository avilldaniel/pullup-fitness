// React-Query hook to fetch user's exercises within specific workout

import { Exercise } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useWorkoutExers = (woName: string) => {
  const { data: session } = useSession();
  return useQuery<Exercise[] | string>(
    ["woExercises", session?.user?.email, woName],
    async () => {
      const res = await fetch(
        `/api/workouts/fetchExercises?email=${session?.user?.email}&woName=${woName}`
      );
      const exercises = await res.json();
      return exercises;
    }
  );
};
