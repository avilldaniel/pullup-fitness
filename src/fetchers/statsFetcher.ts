import axios from "axios";

export default async function statsFetcher(url: string, setStatsArr: any) {
  // console.log("url:", url);
  const { data } = await axios.get(url);
  setStatsArr(data);
  return data;
}
