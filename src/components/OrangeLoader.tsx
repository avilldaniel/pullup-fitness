import { Loader, useMantineTheme } from "@mantine/core";
import { FC } from "react";

const OrangeLoader: FC = () => {
  const theme = useMantineTheme();
  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        left: 10,
        // top: 10,
        // right: 10,
      }}
    >
      <Loader color={theme.colors.orange[3]} size="sm" variant={theme.loader} />
    </div>
  );
};

export default OrangeLoader;
