import { Button } from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const LoginBtn = () => {
  // Get session
  const { data: session } = useSession();

  // useRouter()
  const router = useRouter();

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
          onClick={() => router.push("/u")}
        >
          Go to dashboard
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
      </>
    );
  }

  // Else,
  return (
    // <>
    // {/* Not signed in <br /> */}
    // <button onClick={() => signIn()}>Sign in</button>
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
    // </>
  );
};

export default LoginBtn;
