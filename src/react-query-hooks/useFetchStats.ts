import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "../utils/zustand-stores";

const getStatsFetcher = async ({ queryKey }: QueryFunctionContext) => {
  const username = queryKey[1];
  const res = await axios.get("/api/stats/fetchStats/", {
    params: {
      username,
    },
  });
  return res.data;
};

export const useFetchStats = () => {
  const username = useUserStore((state) => state.username);
  return useQuery(["stats", username], getStatsFetcher, {
    enabled: !!username,
  });
  // return useQuery(["stats", username], (username) => getStatsFetcher(username));
};
