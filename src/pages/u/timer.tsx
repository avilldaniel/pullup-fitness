import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Nav from "../../components/main/Nav";
import NoAuth from "../../components/main/NoAuth";
import RoseLoader from "../../components/main/RoseLoader";
import Timer from "../../components/timer/Timer";
import bg from "../../styles/Background.module.css";

const TimerPage: NextPage = () => {
  // Session
  const { status } = useSession();

  // Loading
  if (status === "loading") {
    return (
      <div className={bg.default}>
        <RoseLoader />
      </div>
    );
  }

  // Not authenticated
  else if (status === "unauthenticated") {
    return <NoAuth />;
  }

  // Authenticated
  return (
    <div className={bg.default}>
      <Nav />
      <Timer />
    </div>
  );
};

export default TimerPage;
