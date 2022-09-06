// home page will re-direct user to login page
// this is temporary while we figure out auth

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import bg from "../styles/Background.module.css";

const Home: NextPage = () => {
  const router = useRouter();

  // implement a check for auth session,
  // if session, re-direct to /u/dashboard
  // else, re-direct

  useEffect(() => {
    router.push("/signin");
  }, [router]);

  return <div className={bg.signin}></div>;
};

export default Home;
