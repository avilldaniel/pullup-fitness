import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../utils/zustand-stores";

const getStatsFetcher = async ({ queryKey }: QueryFunctionContext) => {
  // const username = queryKey[1];
  const res = await fetch("/api/stats/fetchStats");
  const data = await res.json();
  return data;
};

export const useFetchStats = () => {
  const username = useUserStore((state) => state.username);
  // return useQuery(["stats", username], getStatsFetcher, {
  return useQuery(["stats"], getStatsFetcher, {
    enabled: !!username,
  });
};
