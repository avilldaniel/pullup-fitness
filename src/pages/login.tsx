import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const Login: NextPage = () => {
  const schema = z.object({
    email: z.string().email("Incorrect email"),
    // username: z.string().max(3, "Exceeds max length of 3."),
    password: z.string().startsWith("a", "Password must start with'a'"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  // const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input defaultValue="Email" {...register("email")} />
      {errors.email?.message && <p>{errors.email?.message}</p>}
      {/* {errors.email?.message && <p>Invalid email</p>} */}
      <input {...register("password", { required: true })} />
      {/* {errors.password?.message && <span>This field is required</span>} */}
      {errors.password?.message && <p>{errors.password?.message}</p>}
      <input type="submit" />
    </form>
  );
};

export default Login;
