import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import TableStats from "../../components/TableStats";
import ModalExers from "../../components/ModalExers";
import { TableStatsProvider } from "../../components/TableStatsProvider";
import SelectMuscleGrp from "../../components/SelectMuscleGrp";
import { useUserStore } from "../../utils/zustand-stores";
import { useFetchStats } from "../../react-query-hooks/useFetchStats";
import OrangeLoader from "../../components/OrangeLoader";
import exercises from "../../styles/ExercisesTableLayout.module.css";
import bg from "../../styles/Background.module.css";

const Username: NextPage = () => {
  // Router
  const router = useRouter();
  const { username: queryUsername } = router.query;

  // Zustand
  const username = useUserStore((state) => state.username);
  const setUsername = useUserStore((state) => state.setUsername);

  // Fetch user stats
  const { isLoading, isError, data: stats } = useFetchStats();

  // Set username on loadup
  useEffect(() => {
    // console.log("username before set:", username);
    if (queryUsername && typeof queryUsername === "string") {
      setUsername(queryUsername);
      // console.log("username after set:", username);
    }
  }, [username, setUsername, queryUsername]);

  return (
    <div className={bg.color}>
      <TableStatsProvider>
        {isLoading ? (
          <OrangeLoader />
        ) : isError ? (
          <h1>Invalid user.</h1>
        ) : (
          <>
            <h3>Username: {username}</h3>

            <div>
              {/* Select dropdown */}
              <SelectMuscleGrp />
              will be side-by-side
              {/* Modal buttons to add exercises */}
              <ModalExers />
            </div>

            {/* Table */}
            <TableStats />
          </>
        )}
      </TableStatsProvider>
    </div>
  );
};

export default Username;
