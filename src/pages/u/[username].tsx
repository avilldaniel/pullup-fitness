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

const Username: NextPage = () => {
  // Router
  const router = useRouter();
  const { username: queryUsername } = router.query;

  // Zustand
  const username = useUserStore((state) => state.username);
  const setUsername = useUserStore((state) => state.setUsername);

  // Fetch user stats
  // const {} = useFetchStats();
  const { isLoading, isError, data: stats } = useFetchStats();

  // Set username on loadup
  useEffect(() => {
    if (queryUsername && typeof queryUsername === "string") {
      // console.log("username before set:", username);
      setUsername(queryUsername);
      // console.log("username after set:", username);
    }
  }, []);

  if (stats) {
    return (
      <TableStatsProvider>
        <h3>Username: {username}</h3>

        {/* Select dropdown */}
        <SelectMuscleGrp />

        {/* Table */}
        <TableStats />

        {/* Modal buttons to add exercises */}
        <ModalExers />
      </TableStatsProvider>
    );
  }

  return <OrangeLoader />;

  // return (
  //   <TableStatsProvider>
  //     {isLoading ? (
  //       <OrangeLoader />
  //     ) : isError ? (
  //       <h1>Invalid user.</h1>
  //     ) : (
  //       <>
  //         <h3>Username: {username}</h3>

  //         {/* Select dropdown */}
  //         <SelectMuscleGrp />

  //         {/* Table */}
  //         <TableStats />

  //         {/* Modal buttons to add exercises */}
  //         <ModalExers />
  //       </>
  //     )}
  //   </TableStatsProvider>
  // );
};

export default Username;
