import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export default async function statsFetcher(
  url: string,
  // muscleGrp: string,
  setFilteredArr: Dispatch<SetStateAction<never[]>>
  // setStatsArr: Dispatch<SetStateAction<never[]>>
  // setFetchingData: Dispatch<React.SetStateAction<boolean>>
) {
  // console.log("url:", url);
  const { data } = await axios.get(url);
  // console.log("statsFetcher data:", data);
  setFilteredArr(data);
  // setStatsArr(data);
  // setFetchingData(false);
  return data;
}
