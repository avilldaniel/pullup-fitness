import { Loader, useMantineTheme } from "@mantine/core";

export default function OrangeLoader() {
  const theme = useMantineTheme();
  return (
    <div
      style={{
        // margin: "auto",
        // height: "50%",
        position: "fixed",
        top: 0,
        right: 0,
      }}
    >
      <Loader color={theme.colors.orange[3]} size="sm" variant={theme.loader} />
    </div>
  );
}
