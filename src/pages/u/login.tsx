import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "@mantine/core";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../../schemas/zodSchemas";

const Login: NextPage = () => {
  const router = useRouter();
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
    <>
      {/* Login form */}
      <form onSubmit={handleSubmit(submitLogin)}>
        {/* <input
          type="text"
          {...register("login")}
          placeholder="Email or username"
        /> */}
        <TextInput
          placeholder="Email or username"
          variant="filled"
          radius="md"
          size="md"
          required
          {...register("login")}
        />

        {/* <TextInput
          placeholder="Password"
          variant="filled"
          radius="md"
          size="md"
          required
          {...register("password")}
        /> */}

        {/* <input type="submit" value="Log In" /> */}
        <Button type="submit" color="orange">
          Log In
        </Button>

        {/* Invalid message, if login is incorrect */}
        {invalidMsg && <p>{invalidMsg}</p>}
      </form>
    </>
  );
};

export default Login;

// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { NextPage } from "next";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { loginSchema } from "../../schemas/zodSchemas";

// const Login: NextPage = () => {
//   const router = useRouter();
//   const [invalidMsg, setInvalidMsg] = useState("");

//   const {
//     register,
//     handleSubmit,
//     // formState: { errors },
//   } = useForm({ resolver: zodResolver(loginSchema) });

//   const submitLogin: SubmitHandler<FieldValues> = async (data) => {
//     try {
//       const res = await axios.get(`/api/user/${data.login}`);
//       const { username } = res.data;
//       // console.log("destructured username:", username);
//       router.push(`/u/${username}`);
//     } catch (e) {
//       // console.log("e:", e);
//       setInvalidMsg("Invalid login");
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(submitLogin)}>
//         <input
//           type="text"
//           {...register("login")}
//           placeholder="Email or username"
//         />
//         {/* <input type="password" /> */}
//         <input type="submit" value="Log In" />

//         {invalidMsg && <p>{invalidMsg}</p>}
//       </form>
//     </>
//   );
// };

// export default Login;
