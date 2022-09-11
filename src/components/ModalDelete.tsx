import { Button, Modal } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../utils/zustand-stores";
import axios from "axios";
import { Exercise_stat } from "@prisma/client";
import { IModalDelete } from "../utils/types";
import type { FC } from "react";

const ModalDelete: FC<IModalDelete> = ({
  delModalOpened,
  setDelModalOpened,
  invalidDelete,
  deleteQueue,
}) => {
  // Zustand
  const username = useUserStore((state) => state.username);

  // Mutation for deleting a stat
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
    // Invoke delete
    deleteStatsMutation.mutate();

    // Close modal
    setDelModalOpened(false);
  };

  return (
    <>
      {/* Modal */}
      <Modal
        opened={delModalOpened}
        onClose={() => setDelModalOpened(false)}
        title="Are you sure you want to delete this exercise?"
        withCloseButton={false}
        centered
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={
              deleteSubmitted
              // () => deleteMutation.mutate(deleteQueue)
            }
            variant="filled"
            color="red"
            // variant="subtle"
          >
            {/* <Button onClick={deleteSubmitted} color="red" variant="subtle"> */}
            Yes.
          </Button>
          <Button
            onClick={() => setDelModalOpened(false)}
            variant="subtle"
            color="white"
          >
            No.
          </Button>
        </div>
        {invalidDelete && <p>Cannot delete record. Try refreshing.</p>}
      </Modal>

      {/* Deleted notification */}
      {/* {deleteMutation.isLoading ? (
        <OrangeLoader /> // change to global loader
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
