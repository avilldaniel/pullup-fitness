import { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  MantineProvider,
  Modal,
  ScrollArea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customExerSchema } from "../schemas/zodSchemas";
import OrangeLoader from "./OrangeLoader";
import { TableStatsContext } from "../utils/contexts";
import { useUserStore } from "../utils/zustand-stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Exercise, Exercise_stat } from "@prisma/client";

const ModalExers = () => {
  // Theme
  const theme = useMantineTheme();

  // Zustand
  const username = useUserStore((state) => state.username);

  // Context
  const { muscleGrp } = useContext(TableStatsContext);

  // States
  const [presetExers, setPresetExers] = useState<string[]>([]);
  const [presetOpened, setPresetOpened] = useState(false);
  const [customOpened, setCustomOpened] = useState(false);
  const [invalidCustom, setInvalidCustom] = useState(false);
  const [invalidPreset, setInvalidPreset] = useState(false);

  // Fetch available exercises user is allowed to add
  const {
    isLoading,
    isError,
    data: diffArray,
  } = useQuery(
    ["exercise-diff"],
    async () => {
      const res = await axios.get("/api/exercises/differenceExercises", {
        params: {
          username,
          muscleGrp,
        },
      });
      // returns array of Exercises {id, name, muscleGrp, creator}
      return res.data;
    },
    {
      // Run query only when preset modal is opened
      enabled: !!presetOpened,
    }
  );

  // Add new stats to query cache
  const queryClient = useQueryClient();
  const addStatsMutation = useMutation(
    async (exercises: string | string[]) => {
      const res = await axios.post("/api/stats/addStats", {
        username,
        muscleGroup: muscleGrp,
        newExers: exercises,
        // conditionally create object property based on type of exercises
        ...(typeof exercises === "string"
          ? { creatorName: username }
          : { creatorName: "admin" }),
        // creatorName: username,
      });
      return res.data;
    },
    {
      // Update query cache of two arrays
      onSuccess: (data) => {
        queryClient.setQueriesData(
          ["stats", username],
          (oldData: Exercise_stat[] | undefined) => {
            return [...oldData!, ...data];
          }
        );
        queryClient.setQueriesData(
          ["exercise-diff"],
          (oldData: Exercise[] | undefined) => {
            return oldData?.filter((exercise) => {
              exercise.id !== data.id;
            });
          }
        );
      },
    }
  );

  // react-hook-form (useForm) + Zod to validate custom exercise input:
  // 1 <= custom exercise name length <= 30
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customExerSchema),
  });

  // Recommended way to reset a form's schema after submission
  // We clear that actual input form in onCustomSubmit()
  // from react-hook-form docs
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ customExerSchema });
    }
  }, [formState, reset]);

  // Convert items to JSX checkboxes to insert into <Checkbox.Group>
  let checkItems: React.ReactNode[];
  if (diffArray && !isError) {
    checkItems = diffArray.map((exercise: Exercise) => {
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
  const onPresetSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Invoke mutation
      addStatsMutation.mutate(presetExers);

      // After db query, setPresetExer(null), reset invalidPreset (may already be reset),
      // and close modal
      setPresetExers([]);
      setInvalidPreset(false);
      setPresetOpened(false);
    } catch (e) {
      // if not able to query db with new exercises,
      // prompt user for "Unable to add new exercises. Please try refreshing."
      console.error(e);
      setInvalidPreset(true);
    }
  };

  /* --------------------------------CUSTOM EXERCISE----------------------------------- */
  const onCustomSubmit: SubmitHandler<FieldValues> = ({ customExer }) => {
    try {
      // Invoke mutation
      addStatsMutation.mutate(customExer);

      // After db query, setPresetExer(null), reset invalidPreset (may already be reset),
      // and close modal
      setInvalidCustom(false);
      setCustomOpened(false);
      reset();
    } catch (e) {
      // if not able to query db with new exercise (ex. exercise name already exists),
      // prompt user for "Invalid exercise."
      console.error(e);
      setInvalidCustom(true);
    }
  };

  return (
    <div>
      {muscleGrp !== "ALL" && typeof username === "string" && (
        <>
          <main
            style={{
              // dev
              // border: "1px solid yellow",

              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {/* Add preset exercise */}
            <Button
              onClick={() => setPresetOpened(true)}
              // color="orange"
              // variant="gradient"
              // radius="md"
              style={{ width: "12.9em" }}
              // size="xs"
            >
              Add preset exercise
            </Button>

            {/* Add custom exercise */}
            <Button
              onClick={() => setCustomOpened(true)}
              // color="orange"
              // variant="gradient"
              // radius="md"
              style={{ width: "12.9em" }}
              // size="xs"
            >
              Add custom exercise
            </Button>
          </main>

          {/* Modals */}
          <Modal
            opened={presetOpened}
            onClose={() => setPresetOpened(false)}
            title={`Add ${muscleGrp.toLowerCase()} exercise(s)`}
            centered
            size="90%"
            style={
              {
                // maxHeight: "28em",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }
            }
          >
            {/* List available exercises to add */}
            {isLoading ? (
              <OrangeLoader /> // change to global loader
            ) : !diffArray.length ? (
              <p>
                All preset {muscleGrp.toLowerCase()} exercises have already been
                added.
              </p>
            ) : (
              // ) : diffArray ? (
              <form onSubmit={onPresetSubmit}>
                <ScrollArea
                  style={{ height: "20em" }}
                  type="always"
                  offsetScrollbars
                  scrollbarSize={6}
                >
                  <Checkbox.Group
                    // value={presetExer}
                    onChange={setPresetExers}
                    orientation="vertical"
                    spacing="md"
                    size="md"
                  >
                    {checkItems!}
                  </Checkbox.Group>
                </ScrollArea>
                {invalidPreset && (
                  <div>Unable to add new exercises. Please try refreshing.</div>
                )}
                <Button
                  fullWidth
                  mt="md"
                  variant="gradient"
                  gradient={{ from: "#d9480f", to: "#f08c00" }}
                  // onClick={onPresetSubmit}
                  type="submit"
                >
                  Add exercise(s)
                </Button>
              </form>
            )}
          </Modal>

          {/* Add custom exercise
          <Button
            onClick={() => setCustomOpened(true)}
            // color="orange"
            // variant="gradient"
            // radius="md"
          >
            Add custom exercise
          </Button> */}
          <Modal
            opened={customOpened}
            onClose={() => setCustomOpened(false)}
            title={`Create custom ${muscleGrp.toLowerCase()} exercise`}
            centered
          >
            <form onSubmit={handleSubmit(onCustomSubmit)}>
              <TextInput
                {...register("customExer")}
                // onChange={(event) => setNewExers(event.target.value)}
                placeholder="Example: Assisted Pull Ups"
                // placeholder="Name of new exercise"
                data-autofocus
                styles={{
                  input: {
                    "::placeholder": {
                      color: theme.colors.cyan[1],
                    },
                  },
                }}
              />
              {errors.customExer?.message && (
                <div>{errors.customExer.message as unknown as string}</div>
                // <div>{errors.customExer.message}</div>
              )}
              {invalidCustom && (
                <div>Invalid exercise. Try a different name.</div>
              )}
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
          </Modal>
        </>
      )}
    </div>
  );
};

export default ModalExers;
