import { NextPage } from "next";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schemas/zodUserSchema";
import axios from "axios";
import { useState } from "react";

const Register: NextPage = () => {
  // const router = useRouter();

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

  // if form data passes Zod schema, handle submit by invoking api/new-user with the valid data
  const newAccount: SubmitHandler<FieldValues> = async (data) => {
    console.log("onSubmit:", data);

    // Query db with form data
    //  if success, re-direct to user's new dashboard
    //  if fails, render invalid error
    try {
      const res = await axios.post("/api/new-user", data);
      setInvalidMsg("");
      // USE ROUTER.PUSH HERE FOR REDIRECATION
      console.log("res:", res);
      console.log(
        `Account ${res.data.username} has been registered. Re-direct to user dashboard.`
      );
    } catch (error: any) {
      // console.error(error);
      setInvalidMsg(error.response.data.target[0]);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(newAccount)}>
        <input type="text" {...register("email")} placeholder="Email" />
        {errors.email?.message && <p>{errors.email?.message}</p>}

        <input type="text" {...register("name")} placeholder="Name" />
        {errors.name?.message && <p>{errors.name?.message}</p>}

        <input type="text" {...register("username")} placeholder="Username" />
        {errors.username?.message && <p>{errors.username?.message}</p>}

        <input type="submit" value="Sign up" />
      </form>

      {invalidMsg && <p>Invalid {`${invalidMsg}`}</p>}
    </>
  );
};

export default Register;