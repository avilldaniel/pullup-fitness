import { Button, Modal } from "@mantine/core";
import { QueryCache, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../utils/zustand-stores";
import { useFetchStats } from "../react-query-hooks/useFetchStats";
// import { deleteStatsFetcher } from "../react-query-hooks/stats";
import OrangeLoader from "./OrangeLoader";
import axios from "axios";
import { useContext } from "react";
import { TableStatsContext } from "../utils/contexts";
import { Exercise, Exercise_stat } from "@prisma/client";

const ModalDelete = ({
  delModalOpened,
  setDelModalOpened,
  invalidDelete,
  deleteQueue,
}: any) => {
  // Zustand
  const username = useUserStore((state) => state.username);

  // Fetch user stats
  // const { isLoading, isError, data: stats } = useFetchStats();

  const queryClient = useQueryClient();
  const deleteStatsMutation = useMutation(
    async () => {
      const res = await axios.delete("/api/stats/deleteStats", {
        data: deleteQueue,
      });
      return res.data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueriesData(
          ["stats", username],
          (oldData: Exercise_stat[] | undefined) => {
            return oldData?.filter(
              (exercise) => JSON.stringify(exercise) !== JSON.stringify(data)
            );
          }
        );
      },
    }
  );

  // Invoked when user confirms they would like to delete a record
  const deleteSubmitted = () => {
    // hit API route which will query db and delete a record if creatorName !== "admin"
    // res.data should return array user's updated stats
    deleteStatsMutation.mutate();

    //   // if (res.ok), setFilteredArr(res.data) to re-render table stats
    //   if (res.status === 200) {
    //     // setFilteredArr(res.data);
    //   }
    // } catch (e) {
    //   // console.error(e);
    //   // setInvalidDelete(true) -> {invalidDelete && {<p>Cannot delete record. Try refreshing.</p>}}
    //   // setInvalidDelete(true);
    // }

    // close modal
    setDelModalOpened(false);
  };

  return (
    <>
      {/* Modal */}
      <Modal
        opened={delModalOpened}
        onClose={() => setDelModalOpened(false)}
        // title="Are you sure you want to delete this exercise?"
        withCloseButton={false}
        centered
      >
        Are you sure you want to delete this exercise?
        <Button
          onClick={
            deleteSubmitted
            // () => deleteMutation.mutate(deleteQueue)
          }
          color="red"
          variant="subtle"
        >
          {/* <Button onClick={deleteSubmitted} color="red" variant="subtle"> */}
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

      {/* Deleted notification */}
      {/* {deleteMutation.isLoading ? (
        <OrangeLoader />
      ) : deleteMutation.isError ? (
        <p>
          3sec red notification: Could not delete record. Please try refreshing.
        </p>
      ) : (
        <p>Record successfully deleted.</p>
      )} */}
    </>
  );
};

export default ModalDelete;
