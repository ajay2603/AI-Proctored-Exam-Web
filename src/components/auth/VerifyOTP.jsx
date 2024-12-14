import React, { useState, useEffect } from "react";
import authPost from "../../api/auth/auth_post";

function VerifyOTP({ details, setSIn, setVerificationDetails }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [email, setEmail] = useState(details.email);

  useEffect(() => {
    const targetTime = details.date;
    const timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = targetTime - currentTime;

      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        setTimeLeft("Time Expired");
      } else {
        const minutes = Math.floor(timeDifference / 60000);
        const seconds = Math.floor((timeDifference % 60000) / 1000);
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [details.date]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    const body = { ...formData, email };
    try {
      const res = await authPost("/auth/sign-up/verify-otp", body);
      alert(res.data.message);
      setVerificationDetails(null);
      setSIn(true);
    } catch (err) {
      if (err.status === 404) alert("Error Connecting Server");
      else {
        console.error(err);
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5">
      <div className="w-fit">
        <h1 className="text-center logsupTxt logsupHeading">Verify OTP</h1>
      </div>
      <form
        className="flex flex-col gap-3 w-[250px]"
        onSubmit={handleVerifyOTP}
      >
        <label className="font-medium text-red-600 logsupTxt">
          Time Left: {timeLeft || "Calculating..."}
        </label>
        <label className="font-medium logsupTxt">
          ✉️ Enter the OTP sent to your email: {details.email}
        </label>
        <input
          type="text"
          name="otp"
          className="txt-input logsupTxt"
          placeholder="OTP"
          required
        />
        <div className="flex justify-center mt-3">
          <button
            className="text-2xl logsupTxt rounded-lg logsupTxt bg-[#493196] px-3 py-2 w-[200px] text-white transition-all duration-[0.2s] hover:bg-[#563da5] hover:-translate-y-1"
            type="submit"
          >
            Submit
          </button>
        </div>

        <div className="flex flex-col top-5">
          <label>Didn't receive the OTP?</label>
          <button className="px-3 py-1 w-fit my-3 text-[#493196] bg-[#ededed] flex justify-center items-center border-[#493196] border-solid border-2 font-medium rounded-lg shadow-lg">
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
}

export default VerifyOTP;
