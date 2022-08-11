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
import { loginSchema } from "../../schemas/zodSchemas";
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
  const [invalidMsg, setInvalidMsg] = useState("");

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
      setInvalidMsg("Incorrect username or password.");
    }
  };

  return (
    <MantineProvider theme={{ colorScheme: "light" }}>
      <div className={bg.signin}>
        <main className={login.container}>
          <h3>{`<App Name, aha>`}</h3>
          <div className={login.card}>
            {showRegister ? (
              <>register WIP</>
            ) : (
              // Login form
              <form className={login.form} onSubmit={handleSubmit(submitLogin)}>
                <h5>Sign in</h5>
                <TextInput
                  placeholder="Email or username"
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
                      from: theme.colors.rose[3],
                      to: theme.colors.rose[5],
                      deg: 45,
                    }}
                  >
                    Log In
                  </Button>
                </div>

                {/* Invalid message, if login is incorrect */}
                {invalidMsg && <p>{invalidMsg}</p>}
              </form>
            )}
          </div>
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
// {invalidMsg && <p>{invalidMsg}</p>}
