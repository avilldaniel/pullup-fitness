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

  // model User {
  //   id              Int               @id @default(autoincrement())
  //   memberSince     DateTime          @default(now())
  //   username        String            @db.VarChar(50) @unique
  //   email           String            @db.VarChar(50) @unique
  //   name            String?           @db.VarChar(50)
  //   exerciseStats   Exercise_stats[]
  //   workouts        Workout[]
  //   @@index([username])
  // }
  // const schema = z.object({
  //   email: z
  //     .string()
  //     .email()
  //     .trim()
  //     .max(50, "Email cannot exceed 50 characters"),
  //   name: z
  //     .string()
  //     .min(1, "Name must be at least 1 character")
  //     .max(50, "Name cannot exceed 50 characters")
  //     .optional(),
  //   username: z
  //     .string()
  //     .min(5, "Username must be at least 5 characters")
  //     .max(50, "Username cannot exceed 50 characters"),
  // });

  const [invalidMsg, setInvalidMsg] = useState("");

  // instantiate useForm() which will conform to our defined Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  // if form data passes Zod schema, handle submit by invoking api/post-user with the valid data
  const newAccount: SubmitHandler<FieldValues> = async (data) => {
    console.log("onSubmit:", data);

    // Query db with form data
    //  if success, user info can be posted into db, re-direct to user's new dashboard
    //  if fails, user info may already exist in db, render invalid error
    try {
      const res = await axios.post("/api/user/post-user", data);
      setInvalidMsg("");
      // console.log(
      //   `Account ${res.data.username} has been registered. Re-direct to user dashboard.`
      // );
      const { username } = res.data;
      // console.log("destructured username:", username);
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
        {errors.email?.message && <div>{errors.email?.message}</div>}

        <TextInput
          placeholder="Name"
          variant="filled"
          radius="md"
          size="md"
          required
          {...register("name")}
        />
        {errors.name?.message && <div>{errors.name?.message}</div>}

        <TextInput
          placeholder="Username"
          variant="filled"
          radius="md"
          size="md"
          required
          {...register("username")}
        />
        {errors.username?.message && <div>{errors.username?.message}</div>}

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

/****************OG WAY, WILL DELETE LATE******************/
// import { NextPage } from "next";
// import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { userSchema } from "../../schemas/zodSchemas";
// import axios, { AxiosError } from "axios";
// import { useState } from "react";
// import { useRouter } from "next/router";

// const Register: NextPage = () => {
//   const router = useRouter();

//   // model User {
//   //   id              Int               @id @default(autoincrement())
//   //   memberSince     DateTime          @default(now())
//   //   username        String            @db.VarChar(50) @unique
//   //   email           String            @db.VarChar(50) @unique
//   //   name            String?           @db.VarChar(50)
//   //   exerciseStats   Exercise_stats[]
//   //   workouts        Workout[]
//   //   @@index([username])
//   // }
//   // const schema = z.object({
//   //   email: z
//   //     .string()
//   //     .email()
//   //     .trim()
//   //     .max(50, "Email cannot exceed 50 characters"),
//   //   name: z
//   //     .string()
//   //     .min(1, "Name must be at least 1 character")
//   //     .max(50, "Name cannot exceed 50 characters")
//   //     .optional(),
//   //   username: z
//   //     .string()
//   //     .min(5, "Username must be at least 5 characters")
//   //     .max(50, "Username cannot exceed 50 characters"),
//   // });

//   const [invalidMsg, setInvalidMsg] = useState("");

//   // instantiate useForm() which will conform to our defined Zod schema
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(userSchema) });

//   // if form data passes Zod schema, handle submit by invoking api/post-user with the valid data
//   const newAccount: SubmitHandler<FieldValues> = async (data) => {
//     console.log("onSubmit:", data);

//     // Query db with form data
//     //  if success, re-direct to user's new dashboard
//     //  if fails, render invalid error
//     try {
//       const res = await axios.post("/api/user/post-user", data);
//       setInvalidMsg("");
//       // console.log(
//       //   `Account ${res.data.username} has been registered. Re-direct to user dashboard.`
//       // );
//       const { username } = res.data;
//       // console.log("destructured username:", username);
//       router.push(`/u/${username}`);
//     } catch (e: any) {
//       // console.error(e);
//       setInvalidMsg(e.response.data.target[0]);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(newAccount)}>
//         <input type="text" {...register("email")} placeholder="Email" />
//         {errors.email?.message && <p>{errors.email?.message}</p>}

//         <input type="text" {...register("name")} placeholder="Name" />
//         {errors.name?.message && <p>{errors.name?.message}</p>}

//         <input type="text" {...register("username")} placeholder="Username" />
//         {errors.username?.message && <p>{errors.username?.message}</p>}

//         <input type="submit" value="Sign up" />
//       </form>
//       {/* <form onSubmit={handleSubmit(newAccount)}>
//         <input type="text" {...register("email")} placeholder="Email" />
//         {errors.email?.message && <p>{errors.email?.message}</p>}

//         <input type="text" {...register("name")} placeholder="Name" />
//         {errors.name?.message && <p>{errors.name?.message}</p>}

//         <input type="text" {...register("username")} placeholder="Username" />
//         {errors.username?.message && <p>{errors.username?.message}</p>}

//         <input type="submit" value="Sign up" />
//       </form> */}

//       {invalidMsg && <p>Invalid {`${invalidMsg}`}</p>}
//     </>
//   );
// };

// export default Register;
