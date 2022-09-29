import { Modal } from "@mantine/core";
import { FC, useState } from "react";
import ClockUI from "./ClockUI";
import List from "./Dnd";
import NewTimer from "./NewTimer";

type TimerProps = {};

const Timer: FC<TimerProps> = () => {
  const [addingTimer, setAddingTimer] = useState(false);

  return (
    <div>
      <ClockUI />

      <List />

      {/* Add timer */}
      <button onClick={() => setAddingTimer(true)}>Add a timer</button>
      <Modal
        opened={addingTimer}
        onClose={() => setAddingTimer(false)}
        title=""
        // withCloseButton={false}
        // centered
      >
        <NewTimer />
      </Modal>
    </div>
  );
};

export default Timer;
