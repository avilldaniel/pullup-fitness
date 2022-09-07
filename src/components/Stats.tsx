import { useMantineTheme } from "@mantine/core";
import React from "react";
import { useFetchStats } from "../react-query-hooks/useFetchStats";
import { useUserStore } from "../utils/zustand-stores";
import ModalExers from "./ModalExers";
import OrangeLoader from "./OrangeLoader";
import SelectMuscleGrp from "./SelectMuscleGrp";
import TableStats from "./TableStats";
import { TableStatsProvider } from "./TableStatsProvider";
import statStyles from "../styles/Stats.module.css";
import bg from "../styles/Background.module.css";

const StatsComp = ({ username }: any) => {
  // Session
  // const { data: session } = useSession();

  // useRouter()
  // const router = useRouter();

  // Theme
  const theme = useMantineTheme();

  // Zustand
  const email = useUserStore((state) => state.email);
  // const setEmail = useUserStore((state) => state.setEmail);

  // Fetch user stats
  const { isLoading, isError, data: stats } = useFetchStats(email);

  return (
    <div className={bg.default}>
      <TableStatsProvider>
        {isLoading ? (
          <OrangeLoader />
        ) : isError ? (
          <h1>Invalid user.</h1>
        ) : (
          <>
            <header className={statStyles.header}>
              <h3 style={{ color: theme.colors.dark[0] }}>PulluP Fitness</h3>
              <h5>
                Hi,{" "}
                <span style={{ color: theme.colors.orange[4] }}>
                  {username}
                </span>
              </h5>
            </header>
            <div className={statStyles.container}>
              {/* Select dropdown */}
              <SelectMuscleGrp />

              {/* Table */}
              <TableStats />

              {/* Modal buttons to add exercises */}
              <ModalExers username={username} />
            </div>
          </>
        )}
      </TableStatsProvider>
    </div>
  );
};

export default StatsComp;
