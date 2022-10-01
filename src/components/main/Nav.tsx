import { Button, Divider } from "@mantine/core";
import { IconDeviceWatch, IconJumpRope, IconYoga } from "@tabler/icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";
import nav from "../../styles/Nav.module.css";
import rose from "../../styles/RoseBtn.module.css";

interface NavProps {}

const Nav: FC<NavProps> = ({}) => {
  return (
    <div className={nav.container}>
      <h3>PulluP Fitness</h3>
      <main className={nav.menu}>
        <section className={nav.icons}>
          <Link href={"/u/stats"}>
            <button style={{ background: "transparent" }}>
              <IconJumpRope />
            </button>
          </Link>

          {/* <Divider orientation="vertical" mx="xs" my={8} color="dark" /> */}
          <Divider orientation="vertical" mx={7} my={8} color="dark" />

          <Link href={"/u/workout"}>
            <button style={{ background: "transparent" }}>
              <IconYoga />
            </button>
          </Link>

          {/* <Divider orientation="vertical" mx="xs" my={8} color="dark" /> */}
          <Divider orientation="vertical" mx={7} my={8} color="dark" />

          <Link href={"/u/timer"}>
            <button style={{ background: "transparent" }}>
              <IconDeviceWatch />
            </button>
          </Link>

          {/* <Divider orientation="vertical" mx="xs" my={8} color="dark" /> */}
          <Divider orientation="vertical" mx={7} my={8} color="dark" />
        </section>

        <section className={nav.links}>
          <Link href={"/u/stats"}>Stats</Link>
          <Divider orientation="vertical" mx="sm" my="xs" color="dark" />
          <Link href={"/u/workout"}>Workouts</Link>
          <Divider orientation="vertical" mx="sm" my="xs" color="dark" />
          <Link href={"/u/timer"}>Timer</Link>
          <Divider orientation="vertical" mx="sm" my="xs" color="dark" />
        </section>

        <Button
          type="button"
          size="xs"
          className={rose.btn}
          onClick={() => signOut({ callbackUrl: "/signin" })}
          style={{ padding: "0 0.7em", width: "5em" }}
        >
          Log Out
        </Button>
      </main>
    </div>
  );
};
export default Nav;
