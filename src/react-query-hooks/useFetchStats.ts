// React-Query hook to fetch authenticated user's stats

import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const getStatsFetcher = async ({ queryKey }: QueryFunctionContext) => {
  const email = queryKey[1];
  const res = await fetch(`/api/stats/fetchStats?email=${email}`);
  const data = await res.json();
  return data;
};

export const useFetchStats = () => {
  const { data: session } = useSession();
  return useQuery(["stats", session?.user?.email], getStatsFetcher, {
    enabled: !!session?.user?.email,
  });
};
