import { FC, useContext } from "react";
import { ClockContext } from "../../utils/contexts";
import Clock from "./Clock";

interface ClockUIProps {}

const ClockUI: FC<ClockUIProps> = ({}) => {
  const { clock, setClock } = useContext(ClockContext);

  // const timer = setInterval(() => {
  //   const seconds = clock - 1;
  //   setClock(seconds);
  //   console.log(clock);
  // }, 1000);

  const handleStop = () => {
    clearInterval(timer);
  };

  return (
    <>
      <button>Reset</button>
      <Clock />
      {/* <button onClick={handleStart}>Start/Stop</button> */}
    </>
  );
};
export default ClockUI;
