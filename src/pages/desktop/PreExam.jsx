import { useContext, useEffect, useState } from "react";
import { DesktopContext } from "../../providers/Desktop";
import axios from "axios";
import { socket } from "../../providers/Desktop";
const server = import.meta.env.VITE_SERVER;
import { AppExamContext } from "../../providers/DesktopExam";
import { useNavigate } from "react-router-dom";

export default function PreExam() {
  const { token } = useContext(DesktopContext);
  const { questions, setQuestions } = useContext(AppExamContext);
  const [ready, setReady] = useState(false);
  const [enableStart, setEnableStart] = useState(false);
  const navigate = useNavigate();
  const getQuestions = () => {
    axios
      .post(
        `${server}/exam/questions`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log(response.data.questions);
        setQuestions(response.data.questions);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const startPreExam = () => {
    if (window.api) {
      window.api.send({ event: "pre-exam" });
    }
  };

  const startCamFeed = async () => {
    if (socket) {
      socket.emit("start_monitoring");
    } else {
      setTimeout(() => {
        startCamFeed();
      }, 2000);
    }
  };

  if (socket) {
    socket.on("monitoring_result", (data) => {
      if (!ready) setReady(true);
    });
  }

  useEffect(() => {
    console.log("In effect");
    console.log(questions);
    console.log(ready);
    if (questions && ready) {
      console.log("hello in true");
      setEnableStart(true);
    }
  }, [questions, ready]);

  const handleStart = () => {
    navigate("/app/exam", { replace: true });
  };

  useEffect(() => {
    startPreExam();
    getQuestions();
    startCamFeed();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="max-w-lg p-6 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          This is a Proctored Exam
        </h1>
        <p className="text-gray-600">
          Any suspicious activities will be detected. The platform will monitor:
        </p>
        <ul className="mt-4 space-y-2 text-left text-gray-700">
          <li>✅ Gaze Direction</li>
          <li>✅ Identity Verification (Same Person Check)</li>
          <li>✅ Multiple People Detection</li>
        </ul>
        <p className="mt-4 font-semibold text-left text-red-500">
          ⚠️ Violation of exam protocols will result in immediate termination of
          the exam.
        </p>
        <p className="mt-2 font-semibold text-left text-red-500">
          ⚠️ Ensure your environment is well-lit and clearly visible on camera
          to avoid false terminations.
        </p>
        <button
          onClick={handleStart}
          className={`mt-6 px-6 py-3 rounded-lg text-white font-bold transition ${
            enableStart
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!enableStart}
        >
          {enableStart ? "Confirm & Start " : "Monitoring Started"}
        </button>
      </div>
    </div>
  );
}
