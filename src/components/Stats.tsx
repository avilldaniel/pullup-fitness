import React from "react";
import type { FC } from "react";
import { useMantineTheme } from "@mantine/core";
import { useFetchStats } from "../react-query-hooks/useFetchStats";
import ModalExers from "./ModalExers";
import OrangeLoader from "./OrangeLoader";
import SelectMuscleGrp from "./SelectMuscleGrp";
import TableStats from "./TableStats";
import { TableStatsProvider } from "./TableStatsProvider";
import statStyles from "../styles/Stats.module.css";
import bg from "../styles/Background.module.css";
import useFetchUser from "../react-query-hooks/useFetchUser";
import { useSession } from "next-auth/react";
import NoAuth from "./NoAuth";

const StatsComp: FC<any> = () => {
  // Theme
  const theme = useMantineTheme();

  // Session
  const { status } = useSession();

  // Fetch user stats & username
  const { isLoading, isError } = useFetchStats();
  const { data } = useFetchUser();

  // Loading
  if (status === "loading") {
    return <OrangeLoader />;
  }
  // Not authenticated
  else if (status === "unauthenticated") {
    return <NoAuth />;
  }

  return (
    <div className={bg.default}>
      <TableStatsProvider>
        {isLoading ? (
          <OrangeLoader />
        ) : isError ? (
          <h1>Invalid user.</h1>
        ) : (
          data.username && (
            <>
              <header className={statStyles.header}>
                <h3 style={{ color: theme.colors.dark[0] }}>PulluP Fitness</h3>
                <h5>
                  Hi,{" "}
                  <span style={{ color: theme.colors.orange[4] }}>
                    {data.username}
                  </span>
                </h5>
              </header>
              <div className={statStyles.container}>
                {/* Select dropdown */}
                <SelectMuscleGrp />

                {/* Table */}
                <TableStats />

                {/* Modal buttons to add exercises */}
                <ModalExers />
              </div>
            </>
          )
        )}
      </TableStatsProvider>
    </div>
  );
};

export default StatsComp;
