"use client"
import { useContext } from "react";
import { useForm } from "react-hook-form";

// import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import SocialLogin from "../SocialLogin/SocialLogin";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = ({setRegPage}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            role: "student",
            img: data.photoURL,
          };

          router.push("/");
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <div className="my-20 flex items-center justify-center">
        <div className="w-full md:w-[500px]  mx-auto bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Sign up now!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                id="name"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="photoURL">
                Photo URL
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                name="photoURL"
                id="photoURL"
                placeholder="Photo URL"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.photoURL && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">
                  Password must be at least 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600">
                  Password must be less than 20 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600">
                  Password must have at least one uppercase, one lowercase, one
                  number, and one special character
                </span>
              )}
              <label className="block mt-1 text-sm text-gray-600">
                <a href="#" className="text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full  bg-pink-400 text-white rounded-md hover:bg-pink-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <button onClick={()=>setRegPage(false)} className="text-blue-500 hover:underline">
              Login
            </button>
          </p>
          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default Register;
