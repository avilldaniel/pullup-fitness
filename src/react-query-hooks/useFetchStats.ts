import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../utils/zustand-stores";

const getStatsFetcher = async ({ queryKey }: QueryFunctionContext) => {
  const username = queryKey[1];
  const res = await fetch(`/api/stats/fetchStats?username=${username}`);
  const data = await res.json();
  console.log({ data });
  return data;
};

export const useFetchStats = () => {
  const username = useUserStore((state) => state.username);
  // return useQuery(["stats", username], getStatsFetcher, {
  console.log({ username });
  return useQuery(["stats", username], getStatsFetcher, {
    enabled: !!username,
  });
};
