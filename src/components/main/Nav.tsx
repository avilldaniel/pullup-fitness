import { Button, Divider } from "@mantine/core";
import { IconJumpRope, IconYoga } from "@tabler/icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";
import nav from "../../styles/Nav.module.css";

interface NavProps {}

const Nav: FC<NavProps> = ({}) => {
  return (
    <div className={nav.container}>
      <h3>PulluP Fitness</h3>
      <main className={nav.menu}>
        <section className={nav.icons}>
          <Link href={"/u/stats"}>
            <button>
              <IconJumpRope />
            </button>
          </Link>

          <Divider orientation="vertical" mx="xs" my={8} color="dark" />

          <Link href={"/u/workout"}>
            <button>
              <IconYoga />
            </button>
          </Link>
          <Divider orientation="vertical" mx="sm" my={8} color="dark" />
        </section>

        <section className={nav.links}>
          <Link href={"/u/stats"}>Stats</Link>
          <Divider orientation="vertical" mx="sm" my="xs" color="dark" />
          <Link href={"/u/workout"}>Workouts</Link>
          <Divider orientation="vertical" mx="sm" my="xs" color="dark" />
        </section>

        {/* <button onClick={() => signOut()}>Log Out</button> */}
        <Button
          type="button"
          // variant="filled"
          size="xs"
          style={{ backgroundColor: "#c81e4c", padding: "0 .7em" }}
          onClick={() => signOut({ callbackUrl: "/signin" })}
        >
          Log Out
        </Button>
      </main>
    </div>
  );
};
export default Nav;
