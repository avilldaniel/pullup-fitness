import { FormEvent, useContext, useEffect, useState } from "react";
import type { FC } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  Loader,
  Modal,
  ScrollArea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customExerSchema } from "../schemas/zodSchemas";
import { TableStatsContext } from "../utils/contexts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Exercise, Exercise_stat, Muscle_grp, Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import useFetchUser from "../react-query-hooks/useFetchUser";

const ModalExers: FC = () => {
  // Session
  const { data: session } = useSession();

  // Username query cache
  const { data } = useFetchUser();

  // Theme
  const theme = useMantineTheme();

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
          username: data.username,
          muscleGrp,
        },
      });

      // returns Exercise[] {id, name, muscleGrp, creator}
      return res.data;
    },
    {
      // Run query only when preset modal is opened
      enabled: !!presetOpened,
    }
  );

  // Add new stats to query cache
  const queryClient = useQueryClient();

  // Optimistic Updates
  const addStatsMutation = useMutation(
    // ["stats", session?.user?.email],
    (exercises: string | string[]) => {
      return axios.post("/api/stats/addStats", {
        username: data.username,
        muscleGroup: muscleGrp,
        newExers: exercises,
        // conditionally create object property based on type of exercises
        ...(typeof exercises === "string"
          ? { creatorName: data.username }
          : { creatorName: "admin" }),
        // creatorName: username,
      });
    },
    {
      onMutate: async (newExer: string | string[]) => {
        // Optimistically update the cache value on mutate, but store
        // the old value and return it so that it's accessible in case of
        // an error

        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(["stats", session?.user?.email]);

        // Snapshot previous value
        const previousExers = queryClient.getQueriesData([
          "stats",
          session?.user?.email,
        ]);

        // Optimistically update to new value
        if (previousExers) {
          queryClient.setQueriesData(
            ["stats", session?.user?.email],
            (oldData: Exercise_stat[] | undefined) => {
              // Preset exercise
              if (typeof newExer !== "string") {
                let newData: Exercise_stat[] = [];
                newExer.forEach((exercise: string) => {
                  newData.push({
                    creatorName: "admin",
                    exerciseName: exercise,
                    muscleGroup: muscleGrp as Muscle_grp,
                    reps: 0,
                    sets: 0,
                    updatedAt: new Date(),
                    userName: data.username,
                    weight: new Prisma.Decimal(0),
                  });
                });

                // Return snapshotted value
                return [...oldData!, ...newData];
              }
              // Custom exercise
              else {
                const newData: Exercise_stat[] = [
                  {
                    creatorName: data.username,
                    exerciseName: newExer,
                    muscleGroup: muscleGrp as Muscle_grp,
                    reps: 0,
                    sets: 0,
                    updatedAt: new Date(),
                    userName: data.username,
                    weight: new Prisma.Decimal(0),
                  },
                ];

                // Return snapshotted value
                return [...oldData!, ...newData];
              }
            }
          );
        }

        // Update query cache for preset exercises difference
        queryClient.setQueriesData(
          ["exercise-diff"],
          (oldData: Exercise[] | undefined) => {
            return oldData?.filter((exercise) => {
              exercise.name !== newExer;
              // exercise.id !== data.id;
            });
          }
        );

        return { previousExers };
      },

      // On failure, roll back to the previous value
      onError: (previousExers) => {
        console.log("trigger onError");
        queryClient.setQueriesData(
          ["stats", session?.user?.email],
          previousExers
        );
      },

      // After success or failure, refetch the todos query
      onSettled: () => {
        console.log("trigger onSettled");
        queryClient.invalidateQueries(["stats", session?.user?.email]);
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
      {muscleGrp !== "ALL" && typeof data.username === "string" && (
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
              style={{ width: "45%" }}
              // style={{ width: "11em" }}
              // color="orange"
              // variant="gradient"
              // radius="md"
              // size="xs"
            >
              Add preset exercise
            </Button>

            {/* Add custom exercise */}
            <Button
              onClick={() => setCustomOpened(true)}
              style={{ width: "45%" }}
              // style={{ width: "11em" }}
              // color="orange"
              // variant="gradient"
              // radius="md"
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
            style={{
              // maxHeight: "28em",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              maxWidth: "30em",
              margin: "auto",
            }}
          >
            {/* List available exercises to add */}
            {isLoading ? (
              // <OrangeLoader />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader
                  color={theme.colors.orange[3]}
                  size="md"
                  variant={theme.loader}
                />
              </div>
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
                    size="sm"
                  >
                    {checkItems!}
                  </Checkbox.Group>
                </ScrollArea>
                {invalidPreset && (
                  <div>Unable to add new exercises. Please try refreshing.</div>
                )}
                <Button
                  // fullWidth
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
                placeholder="Example: Assisted Pull-Ups"
                // placeholder="Name of new exercise"
                data-autofocus
                // autoFocus={true}
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
                // fullWidth
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
