import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

const getStatsFetcher = async ({ queryKey }: QueryFunctionContext) => {
  const email = queryKey[1];
  const res = await fetch(`/api/stats/fetchStats?email=${email}`);
  const data = await res.json();
  return data;
};

export const useFetchStats = (email: string | null | undefined) => {
  return useQuery(["stats", email], getStatsFetcher, {
    enabled: !!email,
  });
};
