import React, { useState } from "react";

import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

import chatSymb from "../assets/chatSymb.png";
import SignUpSymb from "../assets/signupSymb.png";

export default function Auth(props) {
  const [sIn, setSIn] = useState(true);

  function dispState() {
    setSIn(!sIn);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div
        className={`flex w-[750px] relative h-[570px] overflow-hidden md:rounded-3xl p-4 shadow-2xl ${
          sIn ? "justify-start" : "justify-end"
        } max-md:justify-center max-md:h-screen max-md:w-screen`}
      >
        <div
          className={`px-5 justify-center items-center animate-rit-lef ${
            sIn ? "flex" : "hidden"
          } max-md:flex-col max-md:gap-20 max-md:animate-top-dow`}
        >
          <SignIn />
          <h1 className="text-lg font-medium text-center md:hidden logsupTxt">
            New to AI-Exam
            <br />
            <label
              className="hover:text-[#493196] text-[#5e3df3] cursor-pointer"
              onClick={dispState}
            >
              Sign Up
            </label>
          </h1>
        </div>
        <div
          className={`px-5 justify-center items-center animate-lef-rit ${
            sIn ? "hidden" : "flex"
          }  max-md:flex-col max-md:gap-10 max-md:animate-dow-top`}
        >
          <SignUp updatePG={dispState} setSIn={setSIn} />

          {/**/}
          <h1 className="text-lg font-medium text-center md:hidden logsupTxt">
            Already a user
            <br />
            <label
              className="hover:text-[#493196] text-[#5e3df3] cursor-pointer"
              onClick={dispState}
            >
              Sign In
            </label>
          </h1>
        </div>
        <div
          className={`bg-[#5e3df3] h-full w-[700px] absolute top-0 rounded-[100px] transition-all ease-in-out duration-[1s] ${
            sIn ? "translate-x-[320px]" : "translate-x-[-320px]"
          } max-md:hidden`}
        >
          <div
            className={`w-fit absolute right-0 h-full flex-col justify-center mx-5 animate-rit-lef ${
              sIn ? "hidden" : "flex"
            }`}
          >
            <h1 className="logsupTxt text-white text-[35px] font-semibold text-center">
              Already a User
            </h1>
            <img src={chatSymb} className=" h-1/2" />
            <div className="flex justify-center w-full">
              <button
                className="logsupTxt text-lg font-bold w-[150px] border-white border p-2 rounded-lg text-white hover:text-[#5e3df3] hover:bg-white transition-all duration-[0.3s]"
                onClick={dispState}
              >
                Sign In
              </button>
            </div>
          </div>
          <div
            className={`w-fit absolute left-0 h-full flex-col justify-center ml-20 animate-lef-rit ${
              !sIn ? "hidden" : "flex"
            }`}
          >
            <h1 className="logsupTxt text-white text-[35px] font-semibold text-center">
              New to AI-Exam
            </h1>
            <img src={SignUpSymb} className=" h-1/2" />
            <div className="flex justify-center w-full">
              <button
                className="logsupTxt text-lg font-bold w-[150px] border-white border p-2 rounded-lg text-white hover:text-[#5e3df3] hover:bg-white transition-all duration-[0.3s]"
                onClick={dispState}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
