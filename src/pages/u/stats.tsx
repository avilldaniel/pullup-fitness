import { useMantineTheme } from "@mantine/core";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const Stats: NextPage = () => {
  // Session
  const { status: session, data } = useSession();

  // Theme
  const theme = useMantineTheme();

  return <></>;
};

export default Stats;
