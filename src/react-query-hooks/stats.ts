// context: username

import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import axios from "axios";

// fetch user stats
const getStatsFetcher = async (
  username: QueryFunctionContext<string[], any>
) => {
  const res = await axios.get("/api/stats/fetchStats", {
    params: {
      username,
    },
  });

  return res.data;
};

export const useFetchStats = (username: string) => {
  return useQuery(["fetch-stats", username], (username) =>
    getStatsFetcher(username)
  );
};

//
