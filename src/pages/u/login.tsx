import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const Login: NextPage = () => {
  const router = useRouter();

  const schema = z.object({
    username: z.string().max(4, "Exceeds max length of 4."),
    // email: z.string().email("Incorrect email"),
    // password: z.string().startsWith("a", "Password must start with'a'"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  // const onSubmit = data => console.log(data);
  // console.log("errors:", errors);

  const loginSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log("onSubmit:", data.username);
    router.push(data.username);
  };

  return (
    <form onSubmit={handleSubmit(loginSubmit)}>
      <input {...register("username")} />
      {errors.username?.message && <p>{errors.username?.message}</p>}
      {/* <input defaultValue="Email" {...register("email")} />
      {errors.email?.message && <p>{errors.email.message}</p>}
      <input {...register("password", { required: true })} />
      {errors.password?.message && <p>{errors.password?.message}</p>} */}
      <input type="submit" />
    </form>
  );
};

export default Login;
