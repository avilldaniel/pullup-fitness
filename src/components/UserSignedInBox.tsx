import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import type { FC } from "react";
import login from "../styles/Login.module.css";

interface UserSignedInBoxProps {
  email: string | null | undefined;
}

const UserSignedInBox: FC<UserSignedInBoxProps> = ({ email }) => {
  // useRouter()
  const router = useRouter();

  return (
    <main className={login.container}>
      <div className={login.loginCard}>
        <div className={login.form}>
          <p style={{ fontSize: "1rem", textAlign: "center" }}>
            Signed in as {email}
          </p>

          {/* Dashboard */}
          <Button
            type="button"
            size="md"
            variant="gradient"
            gradient={{
              from: "#e23860",
              to: "#c81e4c",
              deg: 45,
            }}
            // When homepage is defined, make onClick re-direct to "/u"
            onClick={() => router.push("/u/stats")}
            // onClick={handleSignIn}
          >
            {/* when homepage is defined, Go to dashboard */}
            Go to app
          </Button>

          {/* Sign out */}
          <Button
            type="button"
            size="md"
            variant="gradient"
            gradient={{
              from: "#e23860",
              to: "#c81e4c",
              deg: 45,
            }}
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </div>
      </div>
    </main>
  );
};
export default UserSignedInBox;
