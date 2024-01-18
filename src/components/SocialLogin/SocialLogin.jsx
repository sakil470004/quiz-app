"use client";
import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";

import { toast } from "react-hot-toast";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const router = useRouter();

  const handleGoogleSignIn = () => {
    googleLogin().then((result) => {
      const loggedInUser = result.user;
      // todo : uncomment it after server build
      // console.log(loggedInUser)
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        role: "student",
        img: loggedInUser?.photoURL,
      };
      router.push("/");
    });
  };

  return (
    <div>
      <div className="divider"></div>
      <div className="w-full text-center my-4 ">
        <button
          onClick={handleGoogleSignIn}
          className="btn  btn-error  text-white hover:text-gray-200"
        >
          <FaGoogle className="text-yellow-200"></FaGoogle> Google Login
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
