import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  MantineProvider,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, userSchema } from "../schemas/zodSchemas";
import login from "../styles/Login.module.css";
import { useUserStore } from "../utils/zustand-stores";

const LoginBox: FC = () => {
  // Theme
  const theme = useMantineTheme();

  // useRouter()
  const router = useRouter();

  // Zustand
  const setUsername = useUserStore((state) => state.setUsername);

  // State
  const [showRegister, setShowRegister] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState("");
  const [invalidRegister, setInvalidRegister] = useState("");

  /*******************************************************************/
  // For sign-in form
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const submitLogin: SubmitHandler<FieldValues> = async ({ login }) => {
    try {
      // With email, fetch username
      const res = await fetch(`/api/user/username?emailInput=${login}`);

      // If valid, set username in client state, signIn()
      if (res.ok) {
        const { username } = await res.json();
        console.log(username, typeof username);
        setUsername(username);

        signIn("email", {
          email: login,
          callbackUrl: "/",
        });
        // console.log("valid email");
      } else {
        // Else setInvalidLogin()
        setInvalidLogin("Invalid email.");
      }
    } catch (e) {
      // console.log("e:", e);
      setInvalidLogin("An error occurred. Please refresh and try again.");
    }
  };

  /*******************************************************************/
  // For register form
  const {
    register: registerReg,
    handleSubmit: handleRegSubmit,
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
      <main className={login.container}>
        {showRegister ? (
          <div className={login.regCard}>
            {/* Register form */}
            <form className={login.form} onSubmit={handleRegSubmit(newAccount)}>
              <h5>Register</h5>

              {/* Invalid message, if cannot register user */}
              {invalidRegister && (
                <p style={{ fontSize: theme.fontSizes.sm }}>
                  Invalid {invalidRegister}
                </p>
              )}

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
            </form>
          </div>
        ) : (
          /*******************************************************************/
          // Login form
          <div className={login.loginCard}>
            <form className={login.form} onSubmit={handleSubmit(submitLogin)}>
              <h5>Sign in</h5>

              {/* Invalid message, if login is incorrect */}
              {invalidLogin && (
                <p style={{ fontSize: theme.fontSizes.sm }}>{invalidLogin}</p>
              )}

              <TextInput
                placeholder="Email"
                variant="default"
                radius="md"
                size="md"
                required
                {...register("login")}
                className={login.textInput}
              />

              <div className={login.registerOrLogin}>
                <Button
                  variant="subtle"
                  compact
                  style={{ color: theme.colors.cyan[1] }}
                  onClick={() => setShowRegister(true)}
                  className={login.subtleBtn}
                >
                  Create account
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
                  Log In
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </MantineProvider>
  );
};
export default LoginBox;
