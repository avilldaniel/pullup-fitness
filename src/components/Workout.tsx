import { Button, ScrollArea } from "@mantine/core";
import type { FC } from "react";
import work from "../styles/Workout.module.css";
import rose from "../styles/RoseBtn.module.css";

interface WorkoutProps {}

const WorkoutComp: FC<WorkoutProps> = ({}) => {
  return (
    <div className={work.container}>
      <main>
        <ScrollArea scrollbarSize={4} className={work.scroll}>
          <ul>
            <li>Push</li>
            <li>Pull</li>
            <li>Legs</li>
          </ul>
        </ScrollArea>

        {/* Create workout */}
        <Button onClick={() => {}} className={rose.btn}>
          Create workout
        </Button>
      </main>
    </div>
  );
};
export default WorkoutComp;
