import { IconJumpRope, IconYoga } from "@tabler/icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";
import nav from "../styles/Nav.module.css";

interface NavProps {}

const Nav: FC<NavProps> = ({}) => {
  return (
    <div className={nav.container}>
      <h3>PulluP Fitness</h3>
      <main className={nav.menu}>
        <section className={nav.icons}>
          <IconJumpRope />
          <IconYoga />
        </section>

        <section className={nav.links}>
          <Link href={"/u/stats"}>Stats</Link>
          <Link href={"/u/workouts"}>Workouts</Link>
        </section>

        <button onClick={() => signOut()}>Log Out</button>
      </main>
    </div>
  );
};
export default Nav;
