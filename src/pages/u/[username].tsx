import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMantineTheme } from "@mantine/core";
import TableStats from "../../components/TableStats";
import ModalExers from "../../components/ModalExers";
import SelectMuscleGrp from "../../components/SelectMuscleGrp";
import OrangeLoader from "../../components/OrangeLoader";
import { TableStatsProvider } from "../../components/TableStatsProvider";
import { useUserStore } from "../../utils/zustand-stores";
import { useFetchStats } from "../../react-query-hooks/useFetchStats";
import bg from "../../styles/Background.module.css";
import statStyles from "../../styles/Stats.module.css";

const Username: NextPage = () => {
  // Theme
  const theme = useMantineTheme();

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
    <div className={bg.default}>
      <TableStatsProvider>
        {isLoading ? (
          <OrangeLoader /> // change to global loader
        ) : isError ? (
          <h1>Invalid user.</h1>
        ) : (
          <>
            <header className={statStyles.header}>
              <h3 style={{ color: theme.colors.dark[0] }}>
                {`<App Name, aha>`}
              </h3>
              {/* <h4>{`<App Name, aha>`}</h4> */}
              <h5>
                Hi,{" "}
                <span style={{ color: theme.colors.orange[4] }}>
                  {username}
                </span>
              </h5>
            </header>
            <div
              className={statStyles.container}
              style={{
                justifyContent: stats.length ? "space-between" : "flex-start",
              }}
            >
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

export default Username;
