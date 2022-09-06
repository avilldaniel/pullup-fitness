import { Button } from "@mantine/core";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const Index: NextPage = () => {
  // Session
  const { data } = useSession();

  if (data?.user?.email) {
    return (
      <>
        <Link href={"/u/stats"}>Stats</Link>
        <Link href={"/u/workout"}>Workouts</Link>
      </>
    );
  }

  return (
    <>
      You are not signed in.
      <Button
        type="button"
        size="md"
        variant="gradient"
        gradient={{
          from: "#e23860",
          to: "#c81e4c",
          deg: 45,
        }}
        onClick={() => signIn()}
      >
        Sign In
      </Button>
    </>
  );
};

export default Index;
