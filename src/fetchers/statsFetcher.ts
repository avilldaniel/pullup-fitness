import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export default async function statsFetcher(
  url: string,
  setStatsArr: Dispatch<SetStateAction<never[]>>,
  setFetchingData: Dispatch<React.SetStateAction<boolean>>
) {
  // console.log("url:", url);
  const { data } = await axios.get(url);
  // console.log("data:", data);
  setStatsArr(data);
  setFetchingData(false);
  return data;
  // setTimeout(() => {
  //   setStatsArr(data);
  //   return data;
  // }, 5000);
}
