import { useContext, useEffect, useState } from "react";
import { AppExamContext } from "../../providers/DesktopExam";
import { DesktopContext } from "../../providers/Desktop";
import { socket } from "../../providers/Desktop";
import DebugVideo from "./components/DebugVideo";
import CameraVideo from "./components/CameraVideo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const server = import.meta.env.VITE_SERVER;

export default function Exam() {
  const {
    questions,
    answers,
    setAnswers,
    warningsLeft,
    setWarningsLeft,
    setScore,
  } = useContext(AppExamContext);
  const { token } = useContext(DesktopContext);
  const [overlayImage, setOverlayImage] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState([]);
  const [debug, setDebug] = useState(false);
  const [prevDate, setPrevDate] = useState(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const navigate = useNavigate();

  // Calculate seconds difference
  const secDifference = (prev, now) => {
    return Math.floor(Math.abs(now - prev) / 1000);
  };

  const gotoPostExam = () => {
    navigate("/app/post-exam", { replace: true });
  };

  const submitAnswers = async (isCheated) => {
    console.log("Selected answers:", answers);
    if (submitting) {
      return;
    }
    try {
      setSubmitting(true);
      const response = await axios.post(
        `${server}/exam/submit`,
        {
          selectedAnswers: answers,
          isCheated,
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (isCheated) {
        setIsTerminated(true);
        return;
      }

      console.log(response.data);
      setScore(response.data.score);
      alert(response.data.message);
      gotoPostExam();
    } catch (err) {
      console.error("Detailed error:", err);
      alert("Internal Server Error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("monitoring_result", (data) => {
        const currentDate = Date.now();
        if (data.isCheating && secDifference(prevDate, currentDate) > 5) {
          let msg = [];
          if (data.face_count > 1) msg.push("Multiple People detected");
          if (data.isSamePerson == false) msg.push("Different Person detected");
          if (data.isGazeTracked && data.gazeCheating) {
            msg.push(data.gazeResult);
          }
          if (warningsLeft > 0) {
            setWarningMessage(msg);
            setShowWarning(true);
            setPrevDate(currentDate);
            setWarningsLeft(warningsLeft - 1);
          } else {
            //terminate exam
            submitAnswers(true);
          } // Update last detected time
        }
      });
    }
    return () => {
      if (socket) socket.off("monitoring_result");
    };
  }, [prevDate]);

  // Handle Image Click for Overlay
  const handleImageClick = (url) => {
    setOverlayImage(`http://localhost:3000/drive/image/${url}`);
  };

  // Close Overlay
  const closeOverlay = () => {
    setOverlayImage(null);
  };

  // Handle Option Selection
  const handleSelectAnswer = (event) => {
    setAnswers({
      ...answers,
      [event.target.name]: event.target.value,
    });
  };

  // Clear Answer for a Single Question
  const clearAnswer = (questionId) => {
    setAnswers((prev) => {
      const updatedAnswers = { ...prev };
      delete updatedAnswers[questionId];
      return updatedAnswers;
    });
  };

  return (
    <div>
      {/* Camera/Debug Video */}
      <div
        className={`${
          !debug
            ? "flex justify-end w-fit h-28 fixed right-0 z-10"
            : "z-20 fixed flex justify-center items-center w-full h-screen"
        }`}
      >
        <div onClick={() => setDebug(!debug)}>
          {debug ? <DebugVideo /> : <CameraVideo />}
        </div>
      </div>

      {/* Questions List */}
      {questions.map((question, questionIndex) => (
        <div
          key={question.id}
          className="w-full p-6 mb-6 bg-white border-l-4 border-green-400 shadow-lg rounded-xl"
        >
          <h3 className="mb-4 text-2xl font-semibold text-gray-700">
            Question {questionIndex + 1}:
          </h3>

          {/* Question Context */}
          {question.context.map((contextItem) => (
            <div key={contextItem.id} className="mb-4">
              {contextItem.type === "text" && (
                <p className="text-gray-600">{contextItem.text}</p>
              )}
              {contextItem.type === "image" && contextItem.url && (
                <div
                  className="relative flex items-center justify-center w-full h-40 border-2 border-blue-400 border-dashed rounded-lg cursor-pointer bg-blue-50"
                  onClick={() => handleImageClick(contextItem.url)}
                >
                  <img
                    src={`http://localhost:3000/drive/image/${contextItem.url}`}
                    alt="Question related"
                    className="object-cover max-w-full max-h-full rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Answer Options */}
          <h4 className="mt-6 mb-4 text-xl font-semibold text-gray-700">
            Options:
            <button
              className="p-1 px-2 ml-4 text-sm text-white bg-red-500 rounded-sm cursor-pointer"
              onClick={() => clearAnswer(question.id)}
            >
              Clear Answer
            </button>
          </h4>

          {/* Options Rendering */}
          {question.options.map((option, optionIndex) => (
            <div
              key={option.id}
              className="p-4 mb-4 rounded-lg shadow bg-gray-50"
            >
              <div className="flex text-lg font-semibold">
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  checked={answers[question.id] === option.id}
                  onChange={handleSelectAnswer}
                  className="mr-2"
                />
                Option {optionIndex + 1}:
              </div>
              {option.context.map((optionContext) => (
                <div key={optionContext.id} className="mb-2">
                  {optionContext.type === "text" && (
                    <p className="text-gray-600">{optionContext.text}</p>
                  )}
                  {optionContext.type === "image" && optionContext.url && (
                    <div
                      className="relative flex items-center justify-center w-full h-40 border-2 border-blue-400 border-dashed rounded-lg cursor-pointer bg-blue-50"
                      onClick={() => handleImageClick(optionContext.url)}
                    >
                      <img
                        src={`http://localhost:3000/drive/image/${optionContext.url}`}
                        alt="Option related"
                        className="max-w-full max-h-full rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Submit and Clear All Buttons */}
      <div className="flex items-center justify-center w-full gap-10 p-5">
        <button
          className="p-3 py-1 text-lg font-semibold text-white bg-green-500 rounded-md"
          onClick={() => submitAnswers(false)}
        >
          Submit
        </button>
        <button
          className="p-3 py-1 text-lg font-semibold text-white bg-red-500 rounded-md"
          onClick={() => setAnswers({})}
        >
          Clear All
        </button>
      </div>

      {/* Warning Message Popup */}
      {showWarning && (
        <div className="fixed top-0 z-30 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ">
          <div className="flex flex-col w-fit">
            <div className="w-full px-3 py-1 text-lg font-medium text-white bg-red-700">
              Warning! Cheating Detected; Warnings Left: {warningsLeft}
            </div>
            <div className="flex flex-col gap-1 px-3 py-1 bg-red-400">
              {warningMessage.map((msg, index) => (
                <div key={index} className="text-base font-normal text-white">
                  {msg}
                </div>
              ))}
              <div className="flex justify-end my-2 mr-2">
                <button
                  className="px-2 py-1 text-sm text-red-500 bg-white rounded-md"
                  onClick={() => {
                    setShowWarning(false);
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTerminated && (
        <div className="fixed top-0 z-40 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ">
          <div className="flex flex-col w-fit">
            <div className="flex flex-col gap-1 px-5 py-2 text-2xl font-bold text-white bg-red-600 rounded-lg ">
              <h1>Your Exam Is Terminated </h1>
              <h2>Due to Malpractice</h2>
              <div className="flex justify-end my-2 mr-2">
                <button
                  className="px-2 py-1 text-sm text-red-500 bg-white rounded-md"
                  onClick={() => {
                    gotoPostExam();
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Overlay */}
      {overlayImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeOverlay}
        >
          <div className="relative max-w-4xl p-4 overflow-auto bg-white rounded-lg max-h-4xl">
            <button
              className="absolute p-2 text-white bg-red-500 rounded-full top-2 right-2"
              onClick={closeOverlay}
            >
              ✕
            </button>
            <img
              src={overlayImage}
              alt="Enlarged preview"
              className="max-w-full max-h-[90vh] object-contain cursor-zoom-in"
            />
          </div>
        </div>
      )}
    </div>
  );
}
