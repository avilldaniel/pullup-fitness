import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "../utils/zustand-stores";

const getStatsFetcher = async ({ queryKey }: QueryFunctionContext) => {
  const username = queryKey[1];
  const res = await axios.get("/api/stats/fetchStats", {
    params: {
      username: username,
    },
  });
  // const res = await axios.get("/api/stats/fetchStats", {
  //   params: {
  //     username,
  //   },
  // });

  return res.data;
};

export const useFetchStats = () => {
  const username = useUserStore((state) => state.username);
  return useQuery(["stats", username], getStatsFetcher);
  // return useQuery(["stats", username], (username) => getStatsFetcher(username));
};

// Fetch user stats
// const fetchWrapper = (params: any) => {
//   getStatsFetcher(params);
// };

//   // const getStatsFetcher = async (
//   //   username: QueryFunctionContext<string[], any>
//   // ) => {
//   //   const res = await axios.get("/api/stats/fetchStats", {
//   //     params: {
//   //       username,
//   //     },
//   //   });

//   console.log("res.data:", res.data);
//   return res.data;
// };
// // Fetch difference of exercises (admin vs user)
// export const getDiffExersFetcher = async ({ username, muscleGrp }: any) => {
//   const res = await axios.get("/api/exercises/differenceExercises", {
//     params: {
//       username,
//       muscleGrp,
//     },
//   });
//   return res.data;
// };

// // Delete an exercise stat
// interface IDeleteStatsFetcher {
//   username: string;
//   muscleGrp: string;
//   exerciseName: string;
//   creatorName: string;
// }
// export const deleteStatsFetcher = async ({
//   username,
//   muscleGrp,
//   exerciseName,
//   creatorName,
// }: IDeleteStatsFetcher) => {
//   const res = await axios.delete("/api/stats/deleteStats", {
//     data: {
//       username,
//       muscleGrp,
//       exerciseName,
//       creatorName,
//     },
//   });
//   return res.data;
// };
// export const useMutateDeleteStats = (username: string) => {
//   const queryClient = useQueryClient();
//   return useMutation(deleteStatsFetcher, {
//     onSuccess: (data) => {
//       // data -> object that was just deleted
//       queryClient.setQueryData(["stats", username], (old) => {});
//     },
//   });
// };
