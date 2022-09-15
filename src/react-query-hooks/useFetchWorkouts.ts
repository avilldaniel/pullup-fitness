// React-Query hook to fetch user's workouts

import { Workout } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useFetchWorkouts = () => {
  const { data: session } = useSession();
  return useQuery<Workout[] | string>(
    ["workouts", session?.user?.email],
    async () => {
      const res = await fetch(
        `/api/workouts/fetchWorkouts?email=${session?.user?.email}`
      );
      const workouts = await res.json();
      return workouts;
    }
  );
};
