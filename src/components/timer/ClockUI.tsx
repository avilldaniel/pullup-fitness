import { FC, useContext, useRef, useState } from "react";
import { ClockContext } from "../../utils/contexts";
import Clock from "./Clock";

interface ClockUIProps {}
interface IRefProps {
  current: string | number | NodeJS.Timeout | undefined;
}

const ClockUI: FC<ClockUIProps> = ({}) => {
  const { seconds } = useContext(ClockContext);
  const [now, setNow] = useState(seconds);
  const intervalRef: IRefProps = useRef(0);

  console.log({ now });

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
    setNow(seconds);
    clearInterval(intervalRef.current);
  };

  if (now <= 0) {
    clearInterval(intervalRef.current);
  }

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <Clock now={now} />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
};
export default ClockUI;
