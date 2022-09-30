import { FC } from "react";
import { IData } from "./Timer";

interface ClockProps {
  state: IData[];
  now: number;
}

const Clock: FC<ClockProps> = ({ now, state }) => {
  const min = ("0" + Math.floor(now / 60)).slice(-2);
  const sec = ("0" + (now % 60)).slice(-2);

  return (
    <div>
      <p>
        {min}:{sec}
      </p>
      <p>{state[0] && state[0].name}</p>
    </div>
  );
};

export default Clock;
