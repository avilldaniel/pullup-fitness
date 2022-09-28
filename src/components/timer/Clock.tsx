import { FC, useContext } from "react";
import { ClockContext } from "../../utils/contexts";

interface ClockProps {
  now: number;
}

const Clock: FC<ClockProps> = ({ now }) => {
  // const { seconds } = useContext(ClockContext);
  const min = ("0" + Math.floor(now / 60)).slice(-2);
  const sec = ("0" + (now % 60)).slice(-2);

  return (
    <div>
      <p>
        {min}:{sec}
      </p>
    </div>
  );
};

export default Clock;
