"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { AuthContext } from "@/providers/AuthProvider";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const [language, setLanguage] = useState("english");
  const [score, setScore] = useState([]);
  const { user } = useContext(AuthContext);
  const savedLanguage = ["english", "hindi", "bangla", "french", "german"];
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    fetch("https://quiz-app-backend-kkiq8vfum-sakil470004.vercel.app/score")
      .then((res) => res.json())
      .then((data) => {
        const currentLGScore = data.filter((SC) => SC.hasOwnProperty(language));
        setScore(currentLGScore);
      });
  }, [language]);

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <Navbar />
        <div className="overflow-x-auto min-h-svh">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>
                  {/* switch language system */}

                  <select
                    onChange={handleChange}
                    className="uppercase select select-bordered "
                  >
                    {savedLanguage.map((OP) => (
                      <option
                        selected={language === OP}
                        className="uppercase"
                        key={OP}
                        value={OP}
                      >
                        {OP}
                      </option>
                    ))}
                  </select>
                </th>
                <th className="text-green-500 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {/* show all data here */}
              {score.map((SC, index) => (
                <tr
                  key={SC._id}
                  className={`${
                    user.email === SC.email ? "bg-red-200 " : "hover"
                  }`}
                >
                  <th>{index + 1}</th>
                  <td>{SC.name}</td>
                  <td>{SC.email}</td>
                  <td className="uppercase text-red-500">{language}</td>
                  <td className=" text-green-500 font-bold">{SC[language]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
