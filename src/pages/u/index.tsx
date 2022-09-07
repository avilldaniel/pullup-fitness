import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import bg from "../../styles/Background.module.css";
import NoAuth from "../../components/NoAuth";

const Index: NextPage = () => {
  // Session
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div className={bg.default}>
        {/* Turn this section into a nav component */}
        <section>
          <Link href={"/u/stats"}>Stats</Link>
          <Link href={"/u/workout"}>Workouts</Link>
        </section>

        {/* Page is not used, for now. Eventually will become a homepage hub */}
      </div>
    );
  }

  return <NoAuth />;
};

export default Index;
