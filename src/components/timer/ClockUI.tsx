import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ClockContext } from "../../utils/contexts";
import Clock from "./Clock";
import { IData } from "./Timer";
import rose from "../../styles/RoseBtn.module.css";
import { Button } from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";
import timersx from "../../styles/Timer.module.css";

interface ClockUIProps {
  state: IData[];
  handlers: UseListStateHandlers<IData>;
  now: number;
  setNow: Dispatch<SetStateAction<number>>;
}
interface IRefProps {
  current: string | number | NodeJS.Timeout | undefined;
}

const ClockUI: FC<ClockUIProps> = ({ state, handlers, now, setNow }) => {
  const { seconds } = useContext(ClockContext);
  const intervalRef: IRefProps = useRef(0);
  const [showStart, setShowStart] = useState(true);

  // console.log({ now });

  // START
  const handleStart = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow((s) => s - 1);
    }, 1000);
    setShowStart(false);
  };

  // STOP
  const handleStop = () => {
    clearInterval(intervalRef.current);
    setShowStart(true);
  };

  // RESET
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setNow(seconds);
  };

  // Remove current timer when it finishes
  // Re-set now state if there is another timer queued
  useEffect(() => {
    if (now < 0) {
      if (state[1]) {
        setNow(state[1].seconds);
        handlers.remove(0);
      } else {
        setNow(0);
        clearInterval(intervalRef.current);
      }
    }
  }, [state, handlers, now, setNow]);

  return (
    <div className={timersx.clockui}>
      {/* Reset */}
      <Button
        onClick={handleReset}
        disabled={!state[0] ? true : false}
        className={timersx.btn}
      >
        Reset
      </Button>

      {/* Clock */}
      <Clock now={now} state={state} />

      {/* Start/Stop */}
      {showStart ? (
        <Button
          onClick={handleStart}
          disabled={!state[0] ? true : false}
          className={timersx.btn}
        >
          Start
        </Button>
      ) : (
        <Button
          onClick={handleStop}
          disabled={!state[0] ? true : false}
          className={timersx.btn}
        >
          Stop
        </Button>
      )}
    </div>
  );
};
export default ClockUI;
