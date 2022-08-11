import { NextPage } from "next";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schemas/zodSchemas";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextInput } from "@mantine/core";

const Register: NextPage = () => {
  const router = useRouter();
  const [invalidMsg, setInvalidMsg] = useState("");

  // instantiate useForm() which will conform to our defined Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  // if form data passes Zod schema, handle submit by invoking api/post-user with the valid data
  const newAccount: SubmitHandler<FieldValues> = async (data) => {
    // Query db with form data
    //  if success, user info can be posted into db, re-direct to user's new dashboard
    //  if fails, user info may already exist in db, render invalid error
    try {
      const res = await axios.post("/api/user/post-user", data);
      setInvalidMsg("");
      const { username } = res.data;
      router.push(`/u/${username}`);
    } catch (e: any) {
      // console.error(e);
      setInvalidMsg(e.response.data.target[0]);
    }
  };

  return (
    <>
      {/* Register form */}
      <form onSubmit={handleSubmit(newAccount)}>
        <TextInput
          placeholder="Email"
          variant="filled"
          radius="md"
          size="md"
          required
          {...register("email")}
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
          {...register("name")}
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
          {...register("username")}
        />
        {errors.username?.message && (
          <div>{errors.username?.message as unknown as string}</div>
        )}
        {/* {errors.username?.message && <div>{errors.username?.message}</div>} */}

        <Button type="submit" color="orange">
          Sign up
        </Button>
      </form>

      {/* Invalid message, if cannot register user */}
      {invalidMsg && <p>Invalid {`${invalidMsg}`}</p>}
    </>
  );
};

export default Register;
