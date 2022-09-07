import { Button, useMantineTheme } from "@mantine/core";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import bg from "../../styles/Background.module.css";
import login from "../../styles/Login.module.css";
import dash from "../../styles/Dashboard.module.css";

const Index: NextPage = () => {
  // Session
  const { data } = useSession();

  if (data?.user?.email) {
    return (
      <div className={bg.default}>
        {/* Turn this section into a nav component */}
        <section>
          <Link href={"/u/stats"}>Stats</Link>
          <Link href={"/u/workout"}>Workouts</Link>
        </section>

        {/* Add stats component here, for now. Eventually become a homepage hub */}
      </div>
    );
  }

  return (
    <div className={bg.default}>
      <h3 className={login.header}>{`PulluP Fitness`}</h3>
      <main className={dash["no-auth"]}>
        <p>You must be signed in to access this page.</p>
        <Button
          type="button"
          size="lg"
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
      </main>
    </div>
  );
};

export default Index;
