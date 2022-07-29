import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export default async function statsFetcher(
  url: string,
  setStatsArr: Dispatch<SetStateAction<never[]>>
) {
  // console.log("url:", url);
  const { data } = await axios.get(url);
  // console.log("data:", data);
  setStatsArr(data);
  return data;
  // setTimeout(() => {
  //   setStatsArr(data);
  //   return data;
  // }, 5000);
}
