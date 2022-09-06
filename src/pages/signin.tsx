import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  MantineProvider,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import LoginBtn from "../components/LoginBtn";
import { userSchema } from "../schemas/zodSchemas";
import bg from "../styles/Background.module.css";
import login from "../styles/Login.module.css";

const Login: NextPage = () => {
  // Theme
  const theme = useMantineTheme();

  // Router
  const router = useRouter();

  // State
  // state that toggles whether in sign-in or register mode
  const [showRegister, setShowRegister] = useState(false);

  // Session
  const { status: session, data } = useSession();

  /*******************************************************************/
  // For register form
  const [invalidRegister, setInvalidRegister] = useState("");

  // instantiate useForm() which will conform to our defined Zod schema
  const {
    register: registerReg,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  // if form data passes Zod schema, handle submit by invoking api/post-user with the valid data
  const newAccount: SubmitHandler<FieldValues> = async (data) => {
    // Query db with form data
    //  if success, user info can be posted into db, re-direct to user's new dashboard
    //  if fails, user info may already exist in db, render invalid error
    try {
      const res = await axios.post("/api/user/register", data);
      setInvalidRegister("");
      const { username } = res.data;
      router.push(`/u/${username}`);
    } catch (e: any) {
      // console.error(e);
      setInvalidRegister(e.response.data.target[0]);
    }
  };

  return (
    <MantineProvider theme={{ colorScheme: "light" }}>
      <div className={bg.signin}>
        <h3 className={login.header}>{`PulluP Fitness`}</h3>
        <main className={login.container}>
          {showRegister ? (
            <div className={login.regCard}>
              {/* Register form */}
              <form className={login.form} onSubmit={handleSubmit(newAccount)}>
                <h5>Register</h5>
                <TextInput
                  placeholder="Email"
                  variant="default"
                  radius="md"
                  size="md"
                  required
                  {...registerReg("email")}
                  className={login.textInput}
                />
                {errors.email?.message && (
                  <div className={login.error}>
                    {errors.email?.message as unknown as string}
                  </div>
                )}

                <TextInput
                  placeholder="Name"
                  variant="filled"
                  radius="md"
                  size="md"
                  required
                  {...registerReg("name")}
                  className={login.textInput}
                />
                {errors.name?.message && (
                  <div className={login.error}>
                    {errors.name?.message as unknown as string}
                  </div>
                )}

                <TextInput
                  placeholder="Username"
                  variant="filled"
                  radius="md"
                  size="md"
                  required
                  {...registerReg("username")}
                  className={login.textInput}
                />
                {errors.username?.message && (
                  <div className={login.error}>
                    {errors.username?.message as unknown as string}
                  </div>
                )}

                <div
                  className={login.registerOrLogin}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="subtle"
                    compact
                    style={{ color: theme.colors.cyan[1] }}
                    onClick={() => setShowRegister(false)}
                    className={login.subtleBtn}
                  >
                    {/* Back to sign in */}
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="gradient"
                    gradient={{
                      from: theme.colors.rose[4],
                      to: theme.colors.rose[5],
                      deg: 45,
                    }}
                  >
                    Sign up
                  </Button>
                </div>

                {/* Invalid message, if cannot register user */}
                {invalidRegister && (
                  <p style={{ fontSize: theme.fontSizes.sm }}>
                    Invalid {invalidRegister}
                  </p>
                )}
              </form>
            </div>
          ) : (
            /*******************************************************************/
            // Login form
            <div className={login.loginCard}>
              {/* <form className={login.form} onSubmit={handleSubmit(submitLogin)}> */}
              <div className={login.form}>
                {!session || (!data && <h5>Click to sign in</h5>)}
                <LoginBtn />

                {!session ||
                  (!data && (
                    <div className={login.registerOrLogin}>
                      <Button
                        variant="subtle"
                        compact
                        style={{ color: theme.colors.cyan[1] }}
                        onClick={() => setShowRegister(true)}
                        className={login.subtleBtn}
                      >
                        Or, create an account
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </MantineProvider>
  );
};

export default Login;
