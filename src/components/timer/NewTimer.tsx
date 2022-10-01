import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Button, NumberInput, TextInput } from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";
import { IData } from "./Timer";
import rose from "../../styles/RoseBtn.module.css";
import { ClockContext } from "../../utils/contexts";
import timersx from "../../styles/Timer.module.css";

interface IFormData {
  name: string;
  min: number;
  sec: number;
}

interface NewTimerProps {
  state: IData[];
  handlers: UseListStateHandlers<IData>;
  setAddingTimer: Dispatch<SetStateAction<boolean>>;
  setNow: Dispatch<SetStateAction<number | null>>;
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
      seconds: data.min * 60 + data.sec,
      id: new Date().getTime(),
    });

    if (state[0]) {
      setNow(state[0].seconds);
      setSeconds(state[0].seconds);
    } else {
      setNow(data.min * 60 + data.sec);
      setSeconds(data.min * 60 + data.sec);
    }

    setAddingTimer(false);
  };

  return (
    // Modal
    <div>
      <form onSubmit={handleSubmit} className={timersx.form}>
        {/* Name */}
        <TextInput
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.currentTarget.value })}
          label="Name"
          placeholder="Example: Plank"
          // required
          styles={{
            input: {
              "::placeholder": {
                color: "#b5e5fd",
              },
            },
          }}
        />

        <section className={timersx.modaltime}>
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
            max={59}
            min={0}
          />
        </section>

        {/* Add */}
        <Button
          type="submit"
          className={rose.btn}
          style={{ alignSelf: "flex-end" }}
        >
          Add
        </Button>
      </form>
    </div>
  );
};
export default NewTimer;
