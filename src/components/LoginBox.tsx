import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  MantineProvider,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, userSchema } from "../schemas/zodSchemas";
import login from "../styles/Login.module.css";

const LoginBox: FC = () => {
  // Theme
  const theme = useMantineTheme();

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

      // If valid, just signIn()
      if (res.ok) {
        setInvalidLogin("");
        signIn("email", {
          email: login,
          callbackUrl: "/",
        });
      } else {
        // Else setInvalidLogin()
        setInvalidLogin("Invalid email.");
      }
    } catch (e) {
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

  const newAccount: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await fetch("/api/user/register", {
        method: "post",
        body: JSON.stringify(data),
      });

      // If successful in signing up, redirect to login
      // else, throw invalid registration (ie. username/email may already exist)
      if (res.ok) {
        setInvalidRegister("");
        setInvalidLogin("Almost done! Try logging in now.");
        setShowRegister(false);
      } else {
        throw new Error("Invalid email or username.");
      }
    } catch (e: any) {
      console.log(e);
      if (e.message) {
        setInvalidRegister(e.message);
      }
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
                  {invalidRegister}
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
                  style={{ color: "#b5e5fd" }}
                  onClick={() => setShowRegister(false)}
                  className={login.subtleBtn}
                >
                  {/* Back to sign in */}
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="filled"
                  style={{ backgroundColor: "#c81e4c" }}
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
                  style={{ color: "#b5e5fd" }}
                  onClick={() => setShowRegister(true)}
                  className={login.subtleBtn}
                >
                  Create account
                </Button>
                <Button
                  type="submit"
                  variant="filled"
                  style={{ backgroundColor: "#c81e4c" }}
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
