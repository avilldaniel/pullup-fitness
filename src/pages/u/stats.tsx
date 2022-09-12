import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Nav from "../../components/Nav";
import NoAuth from "../../components/NoAuth";
import RoseLoader from "../../components/RoseLoader";
import Stats from "../../components/Stats";

const StatsPage: NextPage = () => {
  // Session
  const { status } = useSession();

  // Loading
  if (status === "loading") {
    return <RoseLoader />;
  }

  // Not authenticated
  else if (status === "unauthenticated") {
    return <NoAuth />;
  }

  // Authenticated
  return (
    <>
      <Nav />
      <Stats />
    </>
  );
};

export default StatsPage;
