import { Button, Checkbox, TextInput } from "@mantine/core";
import { openModal, closeAllModals } from "@mantine/modals";
import { Exercise } from "@prisma/client";
import axios from "axios";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import modalFetcher from "../fetchers/modalFetcher";
import { IModalExers } from "../utils/types";
import OrangeLoader from "./OrangeLoader";

const ModalExers = ({ username, muscleGrp }: IModalExers) => {
  // States
  const [presetExer, setPresetExer] = useState<string[]>([]);
  const [customExer, setCustomExer] = useState<string>("");
  // console.log("presetExer idk:", presetExer);

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

  /* --------------------------------PRESET EXERCISE----------------------------------- */
  // Run when checkbox group has been submitted. Pass presetExer to API route. API route
  // will iterate through each exercise name and it to user's exercise stats w/ the
  // default weight, sets, and reps.
  const handleAddedExer = async (e: FormEvent<HTMLFormElement>) => {
    // const handleAddedExer = async () => {
    e.preventDefault();
    try {
      // POST request only needs username and the names[] of the exercises to be added
      console.log("presetExer:", presetExer);
      const res = await axios.post(`/api/exercises/post/${username}`, {
        newExers: presetExer,
        muscleGroup: muscleGrp,
        creatorName: "admin",
      });
      // console.log("preset exercise res:", res);

      // after db query, setPresetExer([]) and close modal
      // test if stats were re-rendered with new exercises
      setPresetExer([]);
      closeAllModals();
    } catch (e) {
      // if not able to query db with new exercises,
      // prompt user for "Unable to add new exercises. Please try refreshing."
      console.error(e);
    }
  };

  /* --------------------------------CUSTOM EXERCISE----------------------------------- */
  // run when custom exercise button is clicked, which will trigger a focus trap <Popover>
  // Popover will include a <Form>, or just <TextInput onSubmit?>
  const handleNewExer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // POST request will need username, exercise name, and muscle group
      // it will make 2 queries to db: creating exercise & adding it as an exercise stat
      const res = await axios.post(`/api/exercises/post/${username}`, {
        newExers: customExer,
        muscleGroup: muscleGrp,
        creatorName: username,
      });

      // after db query, close modal; test if stats were re-rendered with new exercises
      setCustomExer("");
      closeAllModals();
    } catch (e) {
      // if not able to query db with new exercise (ex. exercise name already exists),
      // prompt user for "Invalid exercise."
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
            title: `Add ${muscleGrp.toLowerCase()} exercise(s)`,
            children: (
              <>
                {/* List available exercises to add */}
                {isValidating ? (
                  <OrangeLoader />
                ) : data && data.length ? (
                  <form onSubmit={handleAddedExer}>
                    <Checkbox.Group
                      // value={presetExer}
                      onChange={setPresetExer}
                      orientation="vertical"
                      spacing="md"
                      size="md"
                    >
                      {checkItems}
                    </Checkbox.Group>
                    <Button
                      fullWidth
                      mt="md"
                      variant="gradient"
                      gradient={{ from: "#d9480f", to: "#f08c00" }}
                      // onClick={handleAddedExer}
                      type="submit"
                    >
                      Add exercise(s)
                    </Button>
                  </form>
                ) : (
                  <p>
                    All preset {muscleGrp.toLowerCase()} exercises have already
                    been added.
                  </p>
                )}
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
                <form onSubmit={handleNewExer}>
                  <TextInput
                    // value={customExer}
                    onChange={(event) => setCustomExer(event.target.value)}
                    // onChange={(e) => setCustomExer(e.currentTarget.value)}
                    placeholder="Name of new exercise"
                    data-autofocus
                  />
                  <Button
                    fullWidth
                    mt="md"
                    variant="gradient"
                    gradient={{ from: "#d9480f", to: "#f08c00" }}
                    // onClick={handleNewExer}
                    type="submit"
                  >
                    Create
                  </Button>
                </form>
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
