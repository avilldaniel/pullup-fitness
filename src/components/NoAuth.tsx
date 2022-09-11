import Link from "next/link";
import type { FC } from "react";
import { Divider, useMantineTheme } from "@mantine/core";
import bg from "../styles/Background.module.css";
import sx from "../styles/NoAuth.module.css";

interface NoAuthProps {}

const NoAuth: FC<NoAuthProps> = ({}) => {
  const theme = useMantineTheme();

  return (
    <div className={`${bg.default} ${sx.container}`}>
      <main className={sx.content}>
        You must be signed in to access this page. <br />
        <Divider my="sm" />
        <Link href="/signin" aria-label="Sign-in link">
          <a
            style={{
              textDecoration: "underline",
              textDecorationColor: theme.colors.rose[5],
            }}
          >
            Go to sign-in
          </a>
        </Link>
      </main>
    </div>
  );
};
export default NoAuth;
