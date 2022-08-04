import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const modalFetcher = async (
  url: string,
  setDiffArray: Dispatch<SetStateAction<never[]>>
) => {
  const { data } = await axios.get(url);
  setDiffArray(data);
  return data;
};

export default modalFetcher;
