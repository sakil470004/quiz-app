"use client";
import { AuthContext } from "@/providers/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [point, setPoint] = useState(0);
  const { currentLanguage, user } = useContext(AuthContext);
  useEffect(() => {
    fetch(`http://localhost:5000/question/${currentLanguage}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        // reset value after refresh
        setShowAns(false);
        setPoint(0);
      });
  }, [currentLanguage]);

  const handleOptionSelect = (questionId, selectedOption) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === questionId
          ? { ...question, userAnswer: selectedOption }
          : question
      )
    );
  };

  const calculateScore = () => {
    const correctAnswers = questions.filter(
      (question) => question.userAnswer === question.correctAnswer
    );
    let totalPoint = 0;
    correctAnswers.map((CA) => {
      totalPoint = totalPoint + CA.answerPoint;
    });
    setShowAns(true);
    toast.success(`Your score: ${totalPoint}`);
    const data = {
      email: user.email,
      name: user.displayName,
      language: currentLanguage,
    };
    setPoint(totalPoint);
    data[currentLanguage] = totalPoint;
    // console.log(data)
    fetch("http://localhost:5000/addScore", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId ||data.modifiedCount>0) {
          toast.success("Result Updated");
        }
      });
  };

  return (
    <div className="  mx-4 px-8 py-6 my-8 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 uppercase">
        {currentLanguage} QUIZ
        <span className={`${showAns ? "text-red-500 text-xl" : "hidden"}`}>
          --- {user.displayName}- Point : {point}
        </span>
      </h1>
      <h6 className="text-sm text-red-400 mb-4">
        Answer the question. The Question Mark is on the right side of the
        question
      </h6>
      <div className="grid grid-cols-1 gap-5">
        {questions.map((question, index) => (
          <div key={question._id} className=" mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold mb-2">
                {index + 1}.{" "}
                {question.question.replace("_placeholder", " ______ ")}
              </h3>
              <span className="text-red-400">
                {" "}
                Point : {question.answerPoint}
              </span>
            </div>
            <ul className="ml-6">
              {question.options.map((option) => (
                <li key={option} className="mb-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={question.userAnswer === option}
                      onChange={() => handleOptionSelect(question._id, option)}
                      className="form-radio text-blue-500"
                    />
                    <span>{option}</span>
                  </label>
                </li>
              ))}
              <span className={`${showAns ? "text-red-500" : "hidden"}`}>
                CA : {question.correctAnswer}
              </span>
            </ul>
          </div>
        ))}
      </div>
      <button onClick={calculateScore} className="btn btn-error text-white">
        Submit
      </button>
    </div>
  );
};

export default Question;
