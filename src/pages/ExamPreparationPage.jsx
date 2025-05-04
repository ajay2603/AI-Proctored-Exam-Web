import React, { useState } from "react";
import authorizedPost from "../api/authorized_post";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ExamPreparationPage = () => {
  const [examId, setExamId] = useState("");

  useState(() => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const examid = queryParams.get("id");
    if (examid) {
      setExamId(examid);
    }
  }, []);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.userToken.accessToken);

  const navigate = useNavigate();

  const handleStartExam = async () => {
    if (!examId) {
      alert("Please enter the Exam ID!");
      return;
    }

    try {
      const response = await authorizedPost(
        `/exam/create/${examId}/token`,
        {},
        accessToken,
        dispatch
      );
      const result = response.data;
      window.location.href = `ai-exam-app://?token=${result.examToken}`;
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }

    // Add logic to start the exam, e.g., API calls or redirects
  };

  const handleDownloadApp = () => {
    const downloadLink = "/desktop-setup.exe"; // Replace with actual download link
    window.open(downloadLink, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 font-sans bg-gradient-to-r from-blue-100 via-gray-100 to-blue-100">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 md:text-4xl">
          Welcome to the Examination Portal
        </h1>
        <p className="mt-2 text-gray-600">
          Your journey to success starts here. Please follow the steps below to
          begin your exam.
        </p>
      </header>

      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
        {/* Left Panel: Exam Start */}
        <div className="flex-1 p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Start Your Exam
          </h2>
          <p className="mb-6 text-gray-600">
            Enter your Exam ID below and click "Start Exam" to proceed.
          </p>
          <div className="mb-4">
            <label
              htmlFor="examId"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Exam ID
            </label>
            <input
              type="text"
              id="examId"
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Exam ID"
            />
          </div>
          <button
            onClick={handleStartExam}
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Start Exam
          </button>
        </div>

        {/* Right Panel: Download App */}
        <div className="flex-1 p-8 border-t bg-gray-50 md:border-t-0 md:border-l">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Download Desktop App
          </h2>
          <p className="mb-6 text-gray-600">
            To ensure a secure and seamless examination experience, please
            download and install our desktop application. It is mandatory for
            taking the exam.
          </p>
          <ul className="pl-5 mb-6 text-gray-600 list-disc">
            <li>Supports Windows 10 and above.</li>
            <li>Securely monitors and tracks the exam environment.</li>
            <li>Lightweight and easy to install.</li>
          </ul>
          <button
            onClick={handleDownloadApp}
            className="w-full py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Download App
          </button>
        </div>
      </div>

      {/* Footer Section */}
      {/*<footer className="mt-8 text-sm text-center text-gray-600">
        © {new Date().getFullYear()} Examination Portal. All rights reserved.
      </footer>*/}
    </div>
  );
};

export default ExamPreparationPage;
