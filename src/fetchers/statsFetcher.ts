import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export default async function statsFetcher(
  url: string,
  setFilteredArr: Dispatch<SetStateAction<never[]>>
) {
  const { data } = await axios.get(url);
  setFilteredArr(data);
  return data;
}
