import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import TableStats from "../../components/TableStats";
import ModalExers from "../../components/ModalExers";
import { TableStatsProvider } from "../../components/TableStatsProvider";
import SelectMuscleGrp from "../../components/SelectMuscleGrp";
import { useUserStore } from "../../utils/zustand-stores";

const Username: NextPage = () => {
  // Router
  const router = useRouter();
  const { username: queryUsername } = router.query;

  // Zustand
  const username = useUserStore((state) => state.username);
  const setUsername = useUserStore((state) => state.setUsername);

  // Set username on loadup
  useEffect(() => {
    if (queryUsername && typeof queryUsername === "string") {
      setUsername(queryUsername);
    }
  }, []);

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
};

export default Username;
