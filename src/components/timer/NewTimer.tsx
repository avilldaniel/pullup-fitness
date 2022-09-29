import { Button } from "@mantine/core";
import type { FC } from "react";

interface NewTimerProps {}

const NewTimer: FC<NewTimerProps> = ({}) => {
  //

  return (
    // Modal
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        onClick={() => {}}
        variant="filled"
        color="red"
        // variant="subtle"
      >
        {/* <Button onClick={deleteSubmitted} color="red" variant="subtle"> */}
        Yes.
      </Button>
      <Button onClick={() => {}} variant="subtle" color="white">
        No.
      </Button>
    </div>
    // {invalidDelete && <p>Cannot delete record. Try refreshing.</p>}
  );
};
export default NewTimer;
