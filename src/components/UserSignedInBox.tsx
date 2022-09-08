import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useUserStore } from "../utils/zustand-stores";

interface UserSignedInBoxProps {
  email: string | null | undefined;
}

const UserSignedInBox: FC<UserSignedInBoxProps> = ({ email }) => {
  // useRouter()
  const router = useRouter();

  // Zustand
  const setUsername = useUserStore((state) => state.setUsername);

  // Handle sign out: clear client state username, then sign out
  const handleSignout = () => {
    setUsername("");
    signOut();
  };
  return (
    <>
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
        onClick={handleSignout}
      >
        Sign out
      </Button>
    </>
  );
};
export default UserSignedInBox;
