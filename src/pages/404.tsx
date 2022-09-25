import type { NextPage } from "next";
import Link from "next/link";
import { Divider } from "@mantine/core";
import bg from "../styles/Background.module.css";
import sx from "../styles/NoAuth.module.css";
import login from "../styles/Login.module.css";
import { IconMoodSad } from "@tabler/icons";

const Error: NextPage = () => {
  return (
    <div className={bg.default}>
      <h3 className={login.header}>{`PulluP Fitness`}</h3>
      <div className={`${sx.container}`}>
        <main className={sx.content}>
          <h1 style={{ fontSize: "5rem" }}>
            4<IconMoodSad size={"4rem"} />4
          </h1>{" "}
          We can{`'`}t seem to find the page you{`'`}re looking for.
          <Divider my="sm" />
          <Link href="/" aria-label="Sign-in link">
            <a
              style={{
                textDecoration: "underline",
                textDecorationColor: "#c81e4c",
              }}
            >
              Go to home.
            </a>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Error;
