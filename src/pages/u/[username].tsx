import { NextPage } from "next";
import { useRouter } from "next/router";
import { Muscle_grp } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSWR from "swr";
import statsFetcher from "../../fetchers/statsFetcher";
import TableStats from "../../components/TableStats";
import OrangeLoader from "../../components/OrangeLoader";
import { Button, Modal, Select } from "@mantine/core";
import ModalExers from "../../components/ModalExers";
import { IOnDelete } from "../../utils/types";
import axios from "axios";
import { TableStatsProvider } from "../../components/TableStatsProvider";
import { TableStatsContext } from "../../utils/contexts";
import { useFetchStats } from "../../react-query-hooks/stats";
import SelectMuscleGrp from "../../components/SelectMuscleGrp";

const Username: NextPage = () => {
  // Convert list of enums into an array
  // const muscleGrps = Object.keys(Muscle_grp);

  // States
  // const [muscleGrp, setMuscleGrp] = useState("ALL");
  const [filteredArr, setFilteredArr] = useState([]);
  const [delModalOpened, setDelModalOpened] = useState(false);
  const [deleteQueue, setDeleteQueue] = useState<IOnDelete | undefined>(
    undefined
  );
  const [invalidDelete, setInvalidDelete] = useState(false);

  // Router
  const router = useRouter();
  const { username: queryUsername } = router.query;

  // useContext
  const { username, setUsername, muscleGrp } = useContext(TableStatsContext);

  // set username on loadup
  useEffect(() => {
    if (queryUsername && typeof queryUsername === "string") {
      setUsername(queryUsername);
    }
  }, []);

  // QueryClient instance
  const queryClient = useQueryClient();

  // Fetch all of user's exercise stats
  const { isLoading, isError, data } = useFetchStats(username);

  // Invoked when user confirms they would like to delete a record
  const deleteSubmitted = async () => {
    // hit API route which will query db and delete a record if creatorName !== "admin"
    // res.data should return array user's updated stats
    try {
      const res = await axios.delete("/api/stats/delete", {
        data: deleteQueue,
      });

      // if (res.ok), setFilteredArr(res.data) to re-render table stats
      if (res.status === 200) {
        setFilteredArr(res.data);
      }
    } catch (e) {
      // console.error(e);
      // setInvalidDelete(true) -> {invalidDelete && {<p>Cannot delete record. Try refreshing.</p>}}
      setInvalidDelete(true);
    }

    // close modal
    setDelModalOpened(false);
  };

  // Items to render for select dropdown
  // const selectOptions = [{ value: "ALL", label: "All" }];
  // muscleGrps.map((group, i) => {
  //   selectOptions.push({
  //     value: `${group}`,
  //     label: `${group[0].toUpperCase() + group.slice(1).toLowerCase()}`,
  //   });
  // });

  return (
    <TableStatsProvider>
      ={/* Select dropdown */}
      <SelectMuscleGrp />
      {/* <Select
        label="Select a muscle group"
        defaultValue={"All"}
        value={muscleGrp}
        // onChange={handleMuscleGrp}
        // onChange={(e) => setMuscleGrp(e)}
        // onChange={(e) => {
        //   console.log("e:", e?.toString());
        //   setMuscleGrp(e!.toString());
        //   console.log("muscleGrp:", muscleGrp);
        // }}
        onChange={(e: string) => setMuscleGrp(e)}
        data={selectOptions}
        transition="scale-y"
        transitionDuration={100}
        transitionTimingFunction="ease"
      /> */}
      {/* Table */}
      <TableStats />
      {/* {isValidating ? (
        <OrangeLoader />
      ) : data && !error && typeof username === "string" ? (
        <TableStats
          muscleGrp={muscleGrp}
          username={username}
          filteredArr={filteredArr}
          setFilteredArr={setFilteredArr}
          setDelModalOpened={setDelModalOpened}
          setDeleteQueue={setDeleteQueue}
        />
      ) : (
        <p>
          To add exercises, select a muscle group. <br />
          Then add from a list of preset exercises, or create your own exercise.
        </p>
      )} */}
      {/* Modal buttons to add exercises */}
      <ModalExers />
      {/* {muscleGrp !== "ALL" && typeof username === "string" && (
        <ModalExers
          username={username}
          muscleGrp={muscleGrp}
          setFilteredArr={setFilteredArr}
        />
      )} */}
      {/* Modal that opens when user is deleting a record */}
      <Modal
        opened={delModalOpened}
        onClose={() => setDelModalOpened(false)}
        // title="Are you sure you want to delete this exercise?"
        withCloseButton={false}
        centered
      >
        Are you sure you want to delete this exercise?
        <Button onClick={deleteSubmitted} color="red" variant="subtle">
          Yes.
        </Button>
        <Button
          onClick={() => setDelModalOpened(false)}
          color="gray"
          variant="subtle"
        >
          No.
        </Button>
        {invalidDelete && <p>Cannot delete record. Try refreshing.</p>}
      </Modal>
    </TableStatsProvider>
  );
};

export default Username;
