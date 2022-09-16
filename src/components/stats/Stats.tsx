import React from "react";
import type { FC } from "react";
import { useFetchStats } from "../../react-query-hooks/useFetchStats";
import ModalExers from "./ModalExers";
import RoseLoader from "../main/RoseLoader";
import SelectMuscleGrp from "./SelectMuscleGrp";
import TableStats from "./TableStats";
import { TableStatsProvider } from "./TableStatsProvider";
import statStyles from "../../styles/Stats.module.css";
import bg from "../../styles/Background.module.css";
import { useSession } from "next-auth/react";
import NoAuth from "../main/NoAuth";

const StatsComp: FC<any> = () => {
  // Session
  const { status } = useSession();

  // Fetch user stats & username
  const { isLoading, isError } = useFetchStats();

  // Loading
  if (status === "loading") {
    return <RoseLoader />;
  }
  // Not authenticated
  else if (status === "unauthenticated") {
    return <NoAuth />;
  }

  return (
    <div className={bg.default}>
      <TableStatsProvider>
        {isLoading ? (
          <RoseLoader />
        ) : isError ? (
          <h1>Invalid user.</h1>
        ) : (
          <>
            <div className={statStyles.container}>
              {/* Select dropdown */}
              <SelectMuscleGrp />

              {/* Table */}
              <TableStats />

              {/* Modal buttons to add exercises */}
              <ModalExers />
            </div>
          </>
        )}
      </TableStatsProvider>
    </div>
  );
};

export default StatsComp;
