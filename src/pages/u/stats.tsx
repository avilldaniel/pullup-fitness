import { useMantineTheme } from "@mantine/core";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NoAuth from "../../components/NoAuth";
import StatsComp from "../../components/Stats";
import { useFetchStats } from "../../react-query-hooks/useFetchStats";
import { useUserStore } from "../../utils/zustand-stores";

const Stats: NextPage = () => {
  // Session
  const { data: session } = useSession();

  // // useRouter()
  // const router = useRouter();

  // // Theme
  // const theme = useMantineTheme();

  // Zustand
  const email = useUserStore((state) => state.email);
  const username = useUserStore((state) => state.username);

  // Fetch user stats
  const { data: stats } = useFetchStats(email);

  console.log({ session, username });

  if (session && username) {
    return (
      // use Stats component with username passed as prop
      <StatsComp username={username} />
    );
  }

  return <NoAuth />;
};

export default Stats;
