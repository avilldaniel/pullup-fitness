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
import { Button } from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";
import timersx from "../../styles/Timer.module.css";
// import beep from '../../../public/beep.mp3';

interface ClockUIProps {
  state: IData[];
  handlers: UseListStateHandlers<IData>;
  now: number | null;
  setNow: Dispatch<SetStateAction<number | null>>;
}
interface IRefProps {
  current: string | number | NodeJS.Timeout | undefined;
}

const ClockUI: FC<ClockUIProps> = ({ state, handlers, now, setNow }) => {
  const { seconds, setSeconds } = useContext(ClockContext);
  const intervalRef: IRefProps = useRef(0);
  const [showStart, setShowStart] = useState(true);

  // console.log({ seconds });
  // console.log({ now });
  // console.table(state);

  // START
  const handleStart = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow((s) => s! - 1);
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
    setNow(seconds);
    handleStop();
  };

  // Remove current timer when it finishes
  // Re-set now state if there is another timer queued
  useEffect(() => {
    // UI beep at 0
    if (now === 0 && state[0]) {
      const beep = new Audio(
        "https://d1i3aib8o7oh3l.cloudfront.net/temp-placeholder/beep.mp3"
      );
      beep.load();
      beep.play();
    }

    if (typeof now === "number" && now < 0) {
      if (state[1]) {
        setNow(state[1].seconds);
        setSeconds(state[1].seconds);
        handlers.remove(0);
      } else {
        setNow(null);
        handleStop();
      }
    }
  }, [state, handlers, now, setNow, setSeconds]);

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
