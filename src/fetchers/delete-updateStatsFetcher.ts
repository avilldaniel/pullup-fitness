import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export default async function updateStatsFetcher(
  url: string,
  setStatsArr: Dispatch<SetStateAction<never[]>>
) {
  const { data } = await axios.get(url);
  setStatsArr(data);
  return data;
}
