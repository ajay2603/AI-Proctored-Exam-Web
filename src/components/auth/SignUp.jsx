import React, { useState } from "react";
import VerifyOTP from "./VerifyOTP";
import authPost from "../../api/auth/auth_post";

const SignUpForm = ({ setVerificationDetails }) => {
  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    try {
      //add loading effect
      const res = await authPost("/auth/sign-up", formData);
      const data = res.data;
      console.log(data);
      setVerificationDetails(data);
    } catch (err) {
      if (err.status === 404) alert("Error Connecting Server");
      else {
        console.log(err);
        alert(err.response.data.message);
      }
    } finally {
      //remove loading effect
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5">
      <div className="w-fit">
        <h1 className="text-center logsupTxt logsupHeading">Sign Up</h1>
      </div>
      <form className="flex flex-col w-full gap-3" onSubmit={handleSignUp}>
        <input
          type="text"
          name="name"
          className="txt-input logsupTxt"
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          className="txt-input logsupTxt"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          className="txt-input logsupTxt"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          className="txt-input logsupTxt focus"
          placeholder="Confirm Password"
          required
        />
        <div className="flex justify-center mt-3">
          <button
            className="text-2xl logsupTxt rounded-lg logsupTxt bg-[#493196] px-3 py-2 w-[200px] text-white transition-all duration-[0.2s] hover:bg-[#563da5] hover:-translate-y-1"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

function SignUp(props) {
  const [verificationDetails, setVerificationDetails] = useState(null);

  return (
    <div>
      {verificationDetails ? (
        <VerifyOTP
          details={verificationDetails}
          setSIn={props.setSIn}
          setVerificationDetails={setVerificationDetails}
        />
      ) : (
        <SignUpForm setVerificationDetails={setVerificationDetails} />
      )}
    </div>
  );
}

export default SignUp;
