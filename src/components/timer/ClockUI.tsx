import { Dispatch, FC, SetStateAction, useContext, useRef } from "react";
import { ClockContext } from "../../utils/contexts";
import Clock from "./Clock";
import { IData } from "./Timer";
import rose from "../../styles/RoseBtn.module.css";
import { Button } from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";

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

  // console.log({ now });

  // START
  const handleStart = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow((s) => s - 1);
    }, 1000);
  };

  // STOP
  const handleStop = () => {
    clearInterval(intervalRef.current);
  };

  // RESET
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setNow(seconds);
  };

  if (now <= 0) {
    // clearInterval(intervalRef.current);
    if (state[1]) {
      setNow(state[1].seconds);
      // handlers.remove(0);
    } else {
      clearInterval(intervalRef.current);
    }
  }

  return (
    <>
      <Button
        onClick={handleReset}
        disabled={!state[0] ? true : false}
        className={rose.btn}
      >
        Reset
      </Button>
      <Clock now={now} state={state} />
      <Button
        onClick={handleStart}
        disabled={!state[0] ? true : false}
        className={rose.btn}
      >
        Start
      </Button>
      <Button
        onClick={handleStop}
        disabled={!state[0] ? true : false}
        className={rose.btn}
      >
        Stop
      </Button>
    </>
  );
};
export default ClockUI;
