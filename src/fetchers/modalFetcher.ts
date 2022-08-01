import axios from "axios";

const modalFetcher = async (url: string) => {
  const { data } = await axios.get(url);
  console.log("fetcher data:", data);
};

export default modalFetcher;
