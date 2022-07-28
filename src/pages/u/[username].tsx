import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Muscle_grp } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";
import statsFetcher from "../../fetchers/statsFetcher";
import TableStats from "../../components/TableStats";

const Username: NextPage = () => {
  // convert list of enums into an array
  const muscleGrps = Object.keys(Muscle_grp);

  // STATES
  const [muscleGrp, setMuscleGrp] = useState("ALL");
  const [statsArr, setStatsArr] = useState([]);

  // ROUTER
  const router = useRouter();
  const { username } = router.query;

  const { data, error } = useSWR(
    username && [`/api/stats/${username}`, setStatsArr],
    statsFetcher,
    {
      onErrorRetry: (error) => {
        // Never retry on 400.
        if (error.status === 400) return;
      },
    }
  );
  // console.log("useSWR data:", data);
  // console.log("useSWR error:", error);
  // console.log("statsArr:", statsArr);

  const handleMuscleGrp = async (e: any) => {
    setMuscleGrp(e.target.value);
    // console.log("e.target.value:", e.target.value);
    // console.log("muscleGrp:", muscleGrp);
  };

  return (
    <>
      <div>Username: {username}</div>

      <select onChange={handleMuscleGrp} value={muscleGrp}>
        <option value="ALL">ALL</option>
        {muscleGrps.map((group, i) => {
          return (
            <option value={group} key={i}>
              {group}
            </option>
          );
        })}
      </select>

      {!error ? (
        <TableStats statsArr={statsArr} muscleGrp={muscleGrp} />
      ) : (
        <p>Cannot fetch data.</p>
      )}
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
