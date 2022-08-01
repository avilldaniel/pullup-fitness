import { Modal } from "@mantine/core";
import React from "react";
import { IModalExer } from "../utils/types";

const ModalExercise = ({ modalOpen, setModalOpen }: IModalExer) => {
  // useSWR, fetch array that is to be rendered inside Modal, which will include radio buttons
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
