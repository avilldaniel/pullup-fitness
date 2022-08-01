import { NextPage } from "next";
import { useRouter } from "next/router";
import { Muscle_grp } from "@prisma/client";
import React, { useState } from "react";
import useSWR from "swr";
import statsFetcher from "../../fetchers/statsFetcher";
import TableStats from "../../components/TableStats";
import OrangeLoader from "../../components/OrangeLoader";
import { Select } from "@mantine/core";
import ModalExers from "../../components/ModalExers";

const Username: NextPage = () => {
  // Convert list of enums into an array
  const muscleGrps = Object.keys(Muscle_grp);

  // States
  const [muscleGrp, setMuscleGrp] = useState("ALL");
  const [filteredArr, setFilteredArr] = useState([]);

  // Router
  const router = useRouter();
  const { username } = router.query;
  // console.log("username:", username);

  const { data, error, isValidating } = useSWR(
    username && [`/api/stats/${username}`, setFilteredArr],
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

  const selectOptions = [{ value: "ALL", label: "All" }];
  muscleGrps.map((group, i) => {
    selectOptions.push({
      value: `${group}`,
      label: `${group[0].toUpperCase() + group.slice(1).toLowerCase()}`,
    });
  });

  return (
    <>
      <h1>Username: {username}</h1>

      {/* Select dropdown */}
      <Select
        label="Select a muscle group"
        defaultValue="All"
        value={muscleGrp}
        // onChange={handleMuscleGrp}
        onChange={(e: string) => setMuscleGrp(e)}
        data={selectOptions}
        transition="scale-y"
        transitionDuration={100}
        transitionTimingFunction="ease"
      />

      {/* Table */}
      {isValidating ? (
        <OrangeLoader />
      ) : data && !error && typeof username === "string" ? (
        <TableStats
          muscleGrp={muscleGrp}
          username={username}
          filteredArr={filteredArr}
          setFilteredArr={setFilteredArr}
        />
      ) : (
        <p>
          Cannot fetch data. <br />
          Implement way to differentiate if invalid user or user just doesnt
          have any stats recorded. Can probably do after adding auth.
        </p>
      )}

      {/* Modal buttons to add exercises */}
      {muscleGrp !== "ALL" && typeof username === "string" && (
        <ModalExers username={username} muscleGrp={muscleGrp} />
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
