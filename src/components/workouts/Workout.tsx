import { Button, Modal, ScrollArea, TextInput } from "@mantine/core";
import React, { FC, useState } from "react";
import work from "../../styles/Workout.module.css";
import rose from "../../styles/RoseBtn.module.css";
import { IconArrowRight } from "@tabler/icons";
import { Workout } from "@prisma/client";
import { useFetchWorkouts } from "../../react-query-hooks/useFetchWorkouts";
import RoseLoader from "../main/RoseLoader";
import ViewExercises from "./ViewExercises";
import { useSession } from "next-auth/react";

interface rowProps {
  workout: Workout;
  index: number;
}

const WorkoutComp: FC = () => {
  // Session
  const session = useSession();

  // Fetch workouts
  const { data: workouts, isLoading } = useFetchWorkouts();

  // State
  const [workoutName, setWorkoutName] = useState<string>("");
  const [viewWorkout, setViewWorkout] = useState(false);
  const [createNew, openCreateNew] = useState(false);
  const [invalidWorkout, setInvalidWorkout] = useState<string>("");

  // Rows to render
  const workoutRow = ({ workout, index }: rowProps) => {
    return (
      <li key={workout.id} className={work.row}>
        <button
          onClick={() => {
            setViewWorkout(true);
            setWorkoutName(workout.name);
          }}
          style={{
            borderTop: index === 0 ? "0" : "2px solid whitesmoke",
          }}
        >
          <h3>{workout.name}</h3>
          <IconArrowRight />
        </button>
      </li>
    );
  };

  /* --------------------------------SUBMIT HANDLER----------------------------------- */
  const handleNewWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/workouts/newExercise", {
      method: "POST",
      body: JSON.stringify({
        name: workoutName,
        email: session.data?.user?.email,
      }),
    });

    if (res.ok) {
      setInvalidWorkout("");
      setViewWorkout(true);
      openCreateNew(false);
    } else {
      setInvalidWorkout(
        "Unable to create workout. Enter a different name or try refreshing."
      );
    }
  };

  if (isLoading) {
    return <RoseLoader />;
  }

  return (
    <div className={work.container}>
      <main>
        {!viewWorkout ? (
          <div className={work.list}>
            {/* List of workouts */}
            <ScrollArea scrollbarSize={4} className={work.scroll}>
              <ul>
                {Array.isArray(workouts) &&
                  workouts.map((workout, index) => {
                    return workoutRow({ workout, index });
                  })}
              </ul>
            </ScrollArea>

            {/* Create workout */}
            <Button
              onClick={() => {
                setWorkoutName("");
                openCreateNew(true);
              }}
              className={rose.btn}
            >
              Create workout
            </Button>
            <Modal
              opened={createNew}
              onClose={() => {
                openCreateNew(false);
                setInvalidWorkout("");
              }}
              title={"Give this workout a title."}
              centered
            >
              <form onSubmit={handleNewWorkout}>
                <TextInput
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.currentTarget.value)}
                  placeholder="Example: Full-body workout"
                  data-autofocus
                  required
                  styles={{
                    input: {
                      "::placeholder": {
                        color: "#b5e5fd",
                      },
                    },
                  }}
                />
                {invalidWorkout && (
                  <div style={{ fontSize: "1rem" }}>{invalidWorkout}</div>
                )}
                <Button
                  type="submit"
                  className={rose.btn}
                  style={{
                    marginTop: "1.5em",
                    width: "40%",
                  }}
                >
                  Create
                </Button>
              </form>
            </Modal>
          </div>
        ) : (
          // View exercises of workout
          <div className={work.view}>
            <ScrollArea scrollbarSize={4} className={work.scroll}>
              <ViewExercises
                workoutName={workoutName}
                setWorkoutName={setWorkoutName}
                setViewWorkout={setViewWorkout}
              />
            </ScrollArea>
          </div>
        )}
      </main>
    </div>
  );
};
export default WorkoutComp;
