// home page will re-direct user to login page
// this is temporary while we figure out auth

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/u/signin");
  }, [router]);
  // useEffect(() => {
  //   router.push("/u/login");
  // }, []);

  return <div>home</div>;
};

export default Home;
