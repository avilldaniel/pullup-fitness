import { NextPage } from "next";
import LoginBox from "../components/LoginBox";
import bg from "../styles/Background.module.css";
import login from "../styles/Login.module.css";

const Login: NextPage = () => {
  return (
    <div className={bg.signin}>
      <h3 className={login.header}>{`PulluP Fitness`}</h3>
      <LoginBox />
    </div>
  );
};

export default Login;
