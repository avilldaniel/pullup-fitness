import { Loader, useMantineTheme } from "@mantine/core";
import { FC } from "react";

const RoseLoader: FC = () => {
  const theme = useMantineTheme();
  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        left: 10,
      }}
    >
      <Loader color="#c81e4c" size="sm" variant={theme.loader} />
    </div>
  );
};

export default RoseLoader;
