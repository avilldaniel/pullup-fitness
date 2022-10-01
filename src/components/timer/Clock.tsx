import { FC } from "react";
import { IData } from "./Timer";
import timersx from "../../styles/Timer.module.css";

interface ClockProps {
  state: IData[];
  now: number;
}

const Clock: FC<ClockProps> = ({ now, state }) => {
  const min = ("0" + Math.floor(now / 60)).slice(-2);
  const sec = ("0" + (now % 60)).slice(-2);

  return (
    <div className={timersx.clock}>
      <section className={timersx.text}>
        <p>
          {min}:{sec}
        </p>
        <p className={timersx.title}>{state[0] && state[0].name}</p>
      </section>
    </div>
  );
};

export default Clock;
