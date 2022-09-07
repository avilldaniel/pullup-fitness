import { Button } from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserStore } from "../utils/zustand-stores";

const LoginBtn = () => {
  // Get session
  const { data: session } = useSession();

  // useRouter()
  const router = useRouter();

  // Zustand
  const setEmail = useUserStore((state) => state.setEmail);
  const setUsername = useUserStore((state) => state.setUsername);

  // On loadup, if session, set email, fetch username with email, then set username
  useEffect(() => {
    (async () => {
      if (session?.user?.email) {
        // Set client email
        setEmail(session.user.email);

        // Fetch then set client user
        const res = await fetch(
          `/api/user/username?email=${session.user.email}`
        );
        const { username } = await res.json();
        setUsername(username);
      }
    })();
  }, [session?.user?.email, setEmail, setUsername]);

  // Handle sign out: clear client state (email & username), then sign out
  const handleSignout = () => {
    setEmail("");
    setUsername("");
    signOut();
  };

  if (session) {
    return (
      <>
        <p style={{ fontSize: "1rem", textAlign: "center" }}>
          Signed in as {session.user?.email}
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
  }

  // Else,
  return (
    <Button
      type="button"
      size="md"
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
  );
};

export default LoginBtn;
