import { FC, useContext } from "react";
import { ClockContext } from "../../utils/contexts";

interface ClockProps {}

const Clock: FC<ClockProps> = ({}) => {
  const { clock } = useContext(ClockContext);
  const minutes = ("0" + clock / 60).slice(-2);
  const seconds = ("0" + (clock % 60)).slice(-2);

  return (
    <div>
      <p>
        {minutes}:{seconds}
      </p>
    </div>
  );
};

export default Clock;
