import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Nav from "../../components/main/Nav";
import NoAuth from "../../components/main/NoAuth";
import RoseLoader from "../../components/main/RoseLoader";
import { ClockProvider } from "../../components/timer/ClockProvider";
import Timer from "../../components/timer/Timer";
import bg from "../../styles/Background.module.css";
import timersx from "../../styles/Timer.module.css";

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
      <ClockProvider>
        <Nav />
        <h6 className={timersx.header}>Timer</h6>
        <Timer />
      </ClockProvider>
    </div>
  );
};

export default TimerPage;
