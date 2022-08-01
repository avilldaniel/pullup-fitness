import { Modal } from "@mantine/core";
import React from "react";
import useSWR from "swr";
import modalFetcher from "../fetchers/modalFetcher";
import { IModalExer } from "../utils/types";

const ModalExercise = ({
  username,
  muscleGrp,
  modalOpen,
  setModalOpen,
}: IModalExer) => {
  // useSWR, fetch array that is to be rendered inside Modal, which will include radio buttons
  const { data, error, isValidating } = useSWR(
    `/api/exercises/${username}/${muscleGrp}`,
    modalFetcher
  );
  return (
    <>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        centered
      ></Modal>
    </>
  );
};

export default ModalExercise;
