import { Button, Modal } from "@mantine/core";
import { QueryCache, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../utils/zustand-stores";
import {
  deleteStatsFetcher,
  useMutateDeleteStats,
} from "../react-query-hooks/stats";
// import { deleteStatsFetcher } from "../react-query-hooks/stats";
import OrangeLoader from "./OrangeLoader";

const ModalDelete = ({
  delModalOpened,
  setDelModalOpened,
  invalidDelete,
  deleteQueue,
}: any) => {
  // Zustand
  const username = useUserStore((state) => state.username);

  // const useMutateDeleteStats = () => {
  //   // const queryClient = useQueryClient();
  //   // const queryCache = QueryCache;
  //   return useMutation(deleteStatsFetcher, {
  //     onSuccess: (data) => {
  //       // const queryCache = QueryCache;
  //       // data -> object that was just deleted
  //       // queryClient.setQueryData(["stats", username], (old) => {
  //       //   console.log("old:", old);
  //       // });

  //     },
  //   });
  // };
  const deleteMutation = useMutateDeleteStats(username);

  // Invoked when user confirms they would like to delete a record
  const deleteSubmitted = () => {
    // hit API route which will query db and delete a record if creatorName !== "admin"
    // res.data should return array user's updated stats
    deleteMutation.mutate(deleteQueue);

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
      {deleteMutation.isLoading ? (
        <OrangeLoader />
      ) : deleteMutation.isError ? (
        <p>
          3sec red notification: Could not delete record. Please try refreshing.
        </p>
      ) : (
        <p>Record successfully deleted.</p>
      )}
    </>
  );
};

export default ModalDelete;
