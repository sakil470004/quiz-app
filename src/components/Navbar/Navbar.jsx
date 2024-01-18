"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { HiOutlineLanguage } from "react-icons/hi2";
const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [currentLanguage, setCurrentLanguage] = useState("english");
  const language = ["english", "india", "bangladesh", "france", "germany"];
  console.log(user);
  return (
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-2xl italic text-red-500">Quiz APP</a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <HiOutlineLanguage className="text-2xl" />
              <span class="badge badge-sm indicator-item">
                {language.length}
              </span>
            </div>
          </div>
          <div
            tabindex="0"
            class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div class="card-body">
              <ul>
                {language.map((option) => (
                  <li
                    key={option}
                    className="mb-2 cursor-pointer hover:text-red-500 hover:font-semibold"
                  >
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="language"
                        value={option}
                        checked={option === currentLanguage}
                        //   onChange={() => handleOptionSelect(question.id, option)}
                        className="form-radio text-blue-500"
                      />
                      <span>{option.toUpperCase()}</span>
                    </label>
                    <div className="border-b-2 mt-2"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div title={user?.displayName} class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar"
          >
            <div class="w-10 rounded-full">
              <img
                alt="Profile Photo"
                src={
                  user?.photoURL
                    ? user?.photoURL
                    : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">{user?.displayName}</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={() => logOut()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
