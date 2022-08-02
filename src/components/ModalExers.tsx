import { Button, Checkbox, TextInput } from "@mantine/core";
import { openModal, closeAllModals } from "@mantine/modals";
import { Exercise } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";
import modalFetcher from "../fetchers/modalFetcher";
import { IModalExers } from "../utils/types";
import OrangeLoader from "./OrangeLoader";

const ModalExers = ({ username, muscleGrp }: IModalExers) => {
  // useSWR, fetch array that is to be rendered inside Modal, which will include radio buttons
  const { data, error, isValidating } = useSWR(
    `/api/exercises/${username}/${muscleGrp}`,
    modalFetcher
  );
  // console.log("data:", data);

  // Convert list items to JSX to insert into <List>
  let checkItems: React.ReactNode[];
  if (data && !error) {
    checkItems = data.map((exercise: Exercise) => {
      return (
        <Checkbox
          key={exercise.id}
          value={exercise.name}
          label={exercise.name}
        />
      );
    });
  }

  // States
  const [presetExer, setPresetExer] = useState<string[]>();

  /* --------------------------------PRESET EXERCISE----------------------------------- */

  /* --------------------------------CUSTOM EXERCISE----------------------------------- */
  // run when custom exercise button is clicked, which will trigger a focus trap <Popover>
  // Popover will include a <Form>, or just <TextInput onSubmit?>
  const handleNewExer = async () => {
    try {
      closeAllModals();
    } catch (e) {
      console.error(e);
    }
  };

  // on Popover Form submit, will only need name of new exercise (so 1 <TextInput>)
  // axios.post will call Next API route which will query db
  // if query fails, prompt user
  // else if query is successful, notify user, then close modal

  return (
    <>
      {/* Add preset exercise */}
      <Button
        onClick={() => {
          openModal({
            title: `Add ${muscleGrp.toLowerCase()} exercise`,
            onClose() {
              setPresetExer([]);
            },
            children: (
              <>
                {/* List available exercises to add */}
                {isValidating ? (
                  <OrangeLoader />
                ) : data.length ? (
                  <Checkbox.Group
                    value={presetExer}
                    onChange={setPresetExer}
                    orientation="vertical"
                    spacing="md"
                    size="md"
                  >
                    {checkItems}
                  </Checkbox.Group>
                ) : (
                  <p>
                    All preset {muscleGrp.toLowerCase()} exercises have already
                    been added.
                  </p>
                )}
                <Button
                  fullWidth
                  mt="md"
                  variant="gradient"
                  gradient={{ from: "#d9480f", to: "#f08c00" }}
                  // onClick={}
                >
                  Add exercise(s)
                </Button>
              </>
            ),
          });
        }}
        color="orange"
        radius="md"
      >
        Add preset exercise
      </Button>

      {/* Add custom exercise */}
      <Button
        onClick={() => {
          openModal({
            title: `Create custom ${muscleGrp.toLowerCase()} exercise`,
            children: (
              <>
                <TextInput placeholder="Name of new exercise" data-autofocus />
                <Button
                  fullWidth
                  mt="md"
                  variant="gradient"
                  gradient={{ from: "#d9480f", to: "#f08c00" }}
                  onClick={handleNewExer}
                >
                  Create
                </Button>
              </>
            ),
          });
        }}
        color="orange"
        radius="md"
      >
        Add custom exercise
      </Button>
    </>
  );
};

export default ModalExers;
