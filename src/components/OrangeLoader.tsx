import { Loader, useMantineTheme } from "@mantine/core";

export default function OrangeLoader() {
  const theme = useMantineTheme();
  return (
    <Loader color={theme.colors.orange[3]} size="sm" variant={theme.loader} />
  );
}
