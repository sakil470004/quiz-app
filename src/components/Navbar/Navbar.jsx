"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { HiOutlineLanguage } from "react-icons/hi2";
import Link from "next/link";
const Navbar = () => {
  const { logOut, user, currentLanguage, setCurrentLanguage } =
    useContext(AuthContext);
  const language = ["english", "hindi", "bangla", "french", "german"];

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-2xl italic text-red-500">
          Quiz APP
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabindex="0" role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <HiOutlineLanguage className="text-2xl" />
              <span className="badge badge-sm indicator-item">
                {language.length}
              </span>
            </div>
          </div>
          <div
            tabindex="0"
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
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
                        onChange={() => setCurrentLanguage(option)}
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
        <div title={user?.displayName} className="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">{user?.displayName}</span>
              </a>
            </li>
            <li>
              <Link href={"/leaderboard"}>Leader Board</Link>
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
