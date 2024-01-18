"use client"
import { useContext, useState } from "react";

import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import SocialLogin from "../SocialLogin/SocialLogin";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Register from "../Register/Register";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [fireError, setFireError] = useState("");
  const router = useRouter();
  const [regPage, setRegPage] = useState(false);

  const handleLogin = (data) => {
    const { email, password } = data;
    setFireError("");
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login success");
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setFireError(`${errorCode} ${errorMessage}`);
      });
  };

  return regPage ? (
    <Register setRegPage={setRegPage} />
  ) : (
    <div className="my-20 flex items-center justify-center">
      <div className="w-full md:w-[500px]  mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login now!</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mt-1 text-sm text-gray-600">
              <a href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="mb-6">
            {fireError && <p className="text-error">{fireError}</p>}
            <button
              type="submit"
              className="w-full  bg-pink-400 text-white rounded-md hover:bg-pink-600"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-sm text-center">
          New Here?{" "}
          <button
            onClick={()=>setRegPage(true)}
            className="text-blue-500 hover:underline"
          >
            Create an account
          </button>
        </p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
