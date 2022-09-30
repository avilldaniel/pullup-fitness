import { Button, NumberInput, TextInput } from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IData } from "./Timer";
import rose from "../../styles/RoseBtn.module.css";
import { ClockContext } from "../../utils/contexts";

interface IFormData {
  name: string;
  min: number;
  sec: number;
}

interface NewTimerProps {
  state: IData[];
  handlers: UseListStateHandlers<IData>;
  setAddingTimer: Dispatch<SetStateAction<boolean>>;
  setNow: Dispatch<SetStateAction<number>>;
}

const NewTimer: FC<NewTimerProps> = ({
  state,
  handlers,
  setAddingTimer,
  setNow,
}) => {
  const { setSeconds } = useContext(ClockContext);

  const [data, setData] = useState<IFormData>({
    name: "",
    min: 0,
    sec: 0,
  });

  // Handle submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handlers.append({
      name: data.name,
      seconds: data.sec,
      id: new Date().getTime(),
    });

    if (state[0]) {
      setNow(state[0].seconds);
      setSeconds(state[0].seconds);
    } else {
      setNow(data.sec);
      setSeconds(data.sec);
    }

    setAddingTimer(false);
  };

  return (
    // Modal
    <div
      style={
        {
          // width: "100%",
          // display: "flex",
          // justifyContent: "flex-end",
        }
      }
    >
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <TextInput
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.currentTarget.value })}
          label="Name"
          required
        />

        <section className="time">
          {/* Minutes */}
          <NumberInput
            value={data.min}
            onChange={(e) => {
              if (e) {
                setData({ ...data, min: e });
              }
            }}
            label="Minutes"
            max={60}
            min={0}
          />

          {/* Seconds */}
          <NumberInput
            value={data.sec}
            onChange={(e) => {
              if (e) {
                setData({ ...data, sec: e });
              }
            }}
            label="Seconds"
            step={15}
            max={60}
            min={0}
          />
        </section>

        {/* Add */}
        <Button type="submit" className={rose.btn}>
          Add
        </Button>
      </form>
    </div>
  );
};
export default NewTimer;
