import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { Muscle_grp } from "@prisma/client";
import { useState } from "react";

const Username: NextPage = () => {
  // convert list of enums into an array
  const muscleGrps = Object.keys(Muscle_grp);
  const [muscleGrp, setMuscleGrp] = useState(muscleGrps[0]);

  const router = useRouter();
  const { username } = router.query;

  const handleMuscleGrp = (e: any) => {
    setMuscleGrp(e.target.value);
    // fetch exercise_stat depending on muscleGrp state
  };

  return (
    <>
      <div>Username: {username}</div>
      <select onChange={handleMuscleGrp} value={muscleGrp}>
        {muscleGrps.map((group, i) => {
          return (
            <option value={group} key={i}>
              {group}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Username;

// eventually, make it so that if the person visiting a user's
// page is the actual authenticated user, it will display their dashboard
// else, it will just show the requested user's public profile
// which will include their stats/workouts/etc.
/***********************************************/
// the SSR fetch will depend on who is the auth user
/***********************************************/
// in the future, we'll implement being able to set
// a user's profile to private or public
