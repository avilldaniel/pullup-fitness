import { NextPage } from "next";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schemas/zodUserSchema";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  const newAccount: SubmitHandler<FieldValues> = async (data) => {
    console.log("onSubmit:", data);
  };

  return (
    <form onSubmit={handleSubmit(newAccount)}>
      <input type="text" {...register("email")} placeholder="Email" />
      {errors.email?.message && <p>{errors.email?.message}</p>}

      <input type="text" {...register("name")} placeholder="Name" />
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <input type="text" {...register("username")} placeholder="Username" />
      {errors.username?.message && <p>{errors.username?.message}</p>}

      <input type="submit" value="Sign up" />
    </form>
  );
};

export default Register;

// import { NextPage } from "next";
// import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// // import * as z from "zod";
// import { schema } from "../api/new-user";

// const Register: NextPage = () => {
//   // const router = useRouter();

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

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(schema) });

//   const newAccount: SubmitHandler<FieldValues> = async (data) => {
//     console.log("onSubmit:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(newAccount)}>
//       <input type="text" {...register("email")} placeholder="Email" />
//       {errors.email?.message && <p>{errors.email?.message}</p>}

//       <input type="text" {...register("name")} placeholder="Name" />
//       {errors.name?.message && <p>{errors.name?.message}</p>}

//       <input type="text" {...register("username")} placeholder="Username" />
//       {errors.username?.message && <p>{errors.username?.message}</p>}

//       <input type="submit" value="Sign up" />
//     </form>
//   );
// };

// export default Register;
