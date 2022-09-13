import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Nav from "../../components/Nav";
import NoAuth from "../../components/NoAuth";
import RoseLoader from "../../components/RoseLoader";
import WorkoutComp from "../../components/Workout";
import bg from "../../styles/Background.module.css";

const Workout: NextPage = () => {
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
      <WorkoutComp />
    </div>
  );
};

export default Workout;
