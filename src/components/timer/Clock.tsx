import { FC } from "react";
import { IData } from "./Timer";
import timersx from "../../styles/Timer.module.css";

interface ClockProps {
  state: IData[];
  now: number | null;
}

const Clock: FC<ClockProps> = ({ now, state }) => {
  const min = now && ("0" + Math.floor(now / 60)).slice(-2);
  const sec = now && ("0" + (now % 60)).slice(-2);

  return (
    <div className={timersx.clock}>
      <section className={timersx.text}>
        <p>{now ? `${min}:${sec}` : `00:00`}</p>
        <p className={timersx.title}>{state[0] && state[0].name}</p>
      </section>
    </div>
  );
};

export default Clock;
