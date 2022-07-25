import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../../schemas/zodSchemas";

const Login: NextPage = () => {
  const [invalidMsg, setInvalidMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const submitLogin: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await axios.get(`/api/user/${data.login}`);
      // update to: const {} = await axios.get('/api/get-user');
      console.log(res);
    } catch (e) {
      console.log("");
      console.log("");
      // setInvalidMsg(e.response.data)
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitLogin)}>
        <input
          type="text"
          {...register("login")}
          placeholder="Email or username"
        />
        {/* <input type="password" /> */}
        <input type="submit" value="Log In" />
      </form>
    </>
  );
};

export default Login;
