import { Modal } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { FC, useContext, useState } from "react";
import { ClockContext } from "../../utils/contexts";
import ClockUI from "./ClockUI";
import Dnd from "./Dnd";
import NewTimer from "./NewTimer";

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
  const [now, setNow] = useState(seconds);
  const [state, handlers] = useListState<IData>([]);
  // const [state, handlers] = useListState<IData>([
  //   { name: "a", seconds: 3, id: new Date().getTime() + 1 },
  //   { name: "b", seconds: 4, id: new Date().getTime() + 2 },
  //   { name: "c", seconds: 5, id: new Date().getTime() + 3 },
  //   { name: "d", seconds: 6, id: new Date().getTime() + 4 },
  // ]);

  console.log({ now });
  console.log({ state });
  console.log({ seconds });

  return (
    <div>
      {/* Clock UI */}
      <ClockUI state={state} handlers={handlers} now={now} setNow={setNow} />

      {/* Dran'n'Drop */}
      <Dnd setNow={setNow} state={state} handlers={handlers} />

      {/* Add timer */}
      <button onClick={() => setAddingTimer(true)}>Add a timer</button>
      <Modal
        opened={addingTimer}
        onClose={() => setAddingTimer(false)}
        title=""
        // withCloseButton={false}
        // centered
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
