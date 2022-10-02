import { FC, useContext, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { ClockContext } from "../../utils/contexts";
import ClockUI from "./ClockUI";
import Dnd from "./Dnd";
import NewTimer from "./NewTimer";
import timersx from "../../styles/Timer.module.css";

export interface IData {
  name: string;
  seconds: number;
  id: number;
}

type TimerProps = {};

const Timer: FC<TimerProps> = () => {
  // Context
  const { seconds } = useContext(ClockContext);

  // State
  const [addingTimer, setAddingTimer] = useState(false);
  const [now, setNow] = useState<number | null>(seconds);
  const [state, handlers] = useListState<IData>([]);

  return (
    <div className={timersx.container}>
      {/* <h6 className={timersx.header}>Timer</h6> */}
      {/* Clock UI */}
      <ClockUI state={state} handlers={handlers} now={now} setNow={setNow} />

      {/* Dran'n'Drop */}
      <Dnd setNow={setNow} state={state} handlers={handlers} />

      {/* Add timer */}
      <Button
        onClick={() => setAddingTimer(true)}
        className={timersx.newtimer}
        variant="outline"
      >
        Add a timer
      </Button>
      <Modal
        opened={addingTimer}
        onClose={() => setAddingTimer(false)}
        title="Add a new timer"
        style={{
          marginTop: "3em",
        }}
      >
        <NewTimer
          state={state}
          handlers={handlers}
          setAddingTimer={setAddingTimer}
          setNow={setNow}
        />
      </Modal>
    </div>
  );
};

export default Timer;
