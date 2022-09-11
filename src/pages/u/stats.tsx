import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import NoAuth from "../../components/NoAuth";
import OrangeLoader from "../../components/OrangeLoader";
import Stats from "../../components/Stats";

const StatsPage: NextPage = () => {
  // Session
  const { status } = useSession();

  // Loading
  if (status === "loading") {
    return <OrangeLoader />;
  }

  // Not authenticated
  else if (status === "unauthenticated") {
    return <NoAuth />;
  }

  // Authenticated
  return (
    <div className="stats_page">
      <Stats />
    </div>
  );
};

export default StatsPage;
