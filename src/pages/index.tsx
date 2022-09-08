// home page will re-direct user to login page
// this is temporary while we figure out auth

import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import bg from "../styles/Background.module.css";

const Home: NextPage = () => {
  // useRouter()
  const router = useRouter();

  // Session
  const { status, data: session } = useSession();

  // implement a check for auth session,
  // if session, re-direct to /u/dashboard
  // else, re-direct

  useEffect(() => {
    if (session && status === "authenticated") {
      router.push("/u/stats");
    }

    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [router, session, status]);

  return <div className={bg.signin}>Homepage</div>;
};

export default Home;
