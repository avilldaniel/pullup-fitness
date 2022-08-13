import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  MantineProvider,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, userSchema } from "../../schemas/zodSchemas";
import bg from "../../styles/Background.module.css";
import login from "../../styles/Login.module.css";

const Login: NextPage = () => {
  // Theme
  const theme = useMantineTheme();

  // Router
  const router = useRouter();

  // State
  // state that toggles whether in sign-in or register mode
  const [showRegister, setShowRegister] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState("");

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const submitLogin: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await axios.get(`/api/user/${data.login}`);
      const { username } = res.data;
      // console.log("destructured username:", username);
      router.push(`/u/${username}`);
    } catch (e) {
      // console.log("e:", e);
      setInvalidLogin("Incorrect username or password.");
    }
  };

  /*******************************************************************/
  // For register form
  const [invalidRegister, setInvalidRegister] = useState("");

  // instantiate useForm() which will conform to our defined Zod schema
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
      const res = await axios.post("/api/user/post-user", data);
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
        <main className={login.container}>
          <h3>{`<App Name, aha>`}</h3>
          {/* <div className={login.card}> */}
          {showRegister ? (
            <div className={login.regCard}>
              {/* Register form */}
              <form
                className={login.form}
                onSubmit={handleRegSubmit(newAccount)}
              >
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
                  <div>{errors.email?.message as unknown as string}</div>
                )}
                {/* {errors.email?.message && <div>{errors.email?.message}</div>} */}

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
                  <div>{errors.name?.message as unknown as string}</div>
                )}
                {/* {errors.name?.message && <div>{errors.name?.message}</div>} */}

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
                  <div>{errors.username?.message as unknown as string}</div>
                )}
                {/* {errors.username?.message && <div>{errors.username?.message}</div>} */}

                <div className={login.registerOrLogin}>
                  <Button
                    variant="subtle"
                    compact
                    style={{ color: theme.colors.cyan[1] }}
                    onClick={() => setShowRegister(false)}
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
              {/* Invalid message, if cannot register user */}
              {invalidRegister && <p>Invalid {invalidRegister}</p>}
            </div>
          ) : (
            /*******************************************************************/
            // Login form
            <div className={login.loginCard}>
              <form className={login.form} onSubmit={handleSubmit(submitLogin)}>
                <h5>Sign in</h5>
                <TextInput
                  placeholder="Username or email"
                  variant="default"
                  // variant="filled"
                  radius="md"
                  size="md"
                  required
                  {...register("login")}
                  className={login.textInput}
                />

                {/* <TextInput
                  placeholder="Password"
                  variant="filled"
                  radius="md"
                  size="md"
                  required
                  {...register("password")}
                  /> */}

                <div className={login.registerOrLogin}>
                  <Button
                    variant="subtle"
                    compact
                    style={{ color: theme.colors.cyan[1] }}
                    onClick={() => setShowRegister(true)}
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

                {/* Invalid message, if login is incorrect */}
                {invalidLogin && <p>{invalidLogin}</p>}
              </form>
            </div>
          )}
          {/* </div> */}
        </main>
      </div>
    </MantineProvider>
  );
};

export default Login;

{
  /* <h5>Sign in</h5>
                  <TextInput
                    placeholder="Email or username"
                    variant="default"
                    // variant="filled"
                    radius="md"
                    size="md"
                    required
                    {...register("login")}
                    className={login.textInput}
                  /> */
}

{
  /* <TextInput
                  placeholder="Password"
                  variant="filled"
                  radius="md"
                  size="md"
                  required
                  {...register("password")}
                  /> */
}

// <div className={login.registerOrLogin}>
//   <Button
//     variant="subtle"
//     compact
//     style={{ color: theme.colors.cyan[1] }}
//   >
//     Create account
//   </Button>
//   <Button
//     type="submit"
//     variant="gradient"
//     gradient={{
//       from: theme.colors.rose[3],
//       to: theme.colors.rose[5],
//       deg: 45,
//     }}
//   >
//     Log In
//   </Button>
// </div>

// {/* Invalid message, if login is incorrect */}
// {invalidRegister && <p>{invalidRegister}</p>}
