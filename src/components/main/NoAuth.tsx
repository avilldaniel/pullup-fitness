import Link from "next/link";
import type { FC } from "react";
import { Divider } from "@mantine/core";
import bg from "../../styles/Background.module.css";
import sx from "../../styles/NoAuth.module.css";
import login from "../../styles/Login.module.css";

interface NoAuthProps {}

const NoAuth: FC<NoAuthProps> = ({}) => {
  return (
    <div className={bg.default}>
      <h3 className={login.header}>{`PulluP Fitness`}</h3>
      <div className={`${sx.container}`}>
        <main className={sx.content}>
          You must be signed in to access this page. <br />
          <Divider my="sm" />
          <Link href="/signin" aria-label="Sign-in link">
            <a
              style={{
                textDecoration: "underline",
                textDecorationColor: "#c81e4c",
              }}
            >
              Go to sign-in
            </a>
          </Link>
        </main>
      </div>
    </div>
  );
};
export default NoAuth;
