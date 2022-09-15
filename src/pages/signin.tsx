import { NextPage } from "next";
import { useSession } from "next-auth/react";
import LoginBox from "../components/main/LoginBox";
import RoseLoader from "../components/main/RoseLoader";
import UserSignedInBox from "../components/main/UserSignedInBox";
import bg from "../styles/Background.module.css";
import login from "../styles/Login.module.css";

const Login: NextPage = () => {
  // Session
  const { status, data: session } = useSession();
  return (
    <div className={bg.signin}>
      <h3 className={login.header}>{`PulluP Fitness`}</h3>

      {status === "loading" ? (
        <RoseLoader />
      ) : status === "authenticated" ? (
        <UserSignedInBox email={session.user?.email} />
      ) : (
        <LoginBox />
      )}
    </div>
  );
};

export default Login;
