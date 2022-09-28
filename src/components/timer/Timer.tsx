import { Modal } from "@mantine/core";
import { FC, useState } from "react";
import ClockUI from "./ClockUI";
import List from "./List";

type TimerProps = {};

const Timer: FC<TimerProps> = () => {
  const [addingTimer, setAddingTimer] = useState(false);
  // user adds a timer

  // timer is stored as state variable

  // when user hits 'start', call handleFn
  // convert timer state variable to seconds (sec)
  // run timer = setInterval(cb, sec * 1000)
  // inside setInterval, create conditional (counter >= sec)
  // when conditional is met, call clearInterval(timer)
  // else, ++sec

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
        test
      </Modal>
    </div>
  );
};

export default Timer;
