import { Button } from "@mantine/core";
import { signIn } from "next-auth/react";
import bg from "../styles/Background.module.css";
import login from "../styles/Login.module.css";
import dash from "../styles/Dashboard.module.css";

const NoAuth = () => {
  return (
    <div className={bg.default}>
      <h3 className={login.header}>{`PulluP Fitness`}</h3>
      <main className={dash["no-auth"]}>
        <p>You must be signed in to access this page.</p>
        <Button
          type="button"
          size="lg"
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
      </main>
    </div>
  );
};

export default NoAuth;
