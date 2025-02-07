import { useContext, useState } from "react";
import { AppExamContext } from "../../providers/DesktopExam";
import { socket } from "../../providers/Desktop";

export default function PostExam() {
  const { score } = useContext(AppExamContext);

  const stopCamaraFeed = () => {
    if (socket) {
      socket.emit("stop_monitoring");
    }
  };

  const electronPostExam = () => {
    if (window.api) {
      window.api.send({ event: "post-exam" });
    }
  };

  // Function to close the app (works in Electron)
  const closeApp = () => {
    if (window.api) {
      window.api.send({ event: "quit-app" });
    } else {
      window.close();
    } // This will close the browser tab or Electron app
  };

  useState(() => {
    stopCamaraFeed();
    electronPostExam();
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">
          Your Exam is Completed
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Score: <span className="font-semibold">{score}</span>
        </p>

        {/* Additional Content */}
        <div className="mt-6">
          <p className="text-gray-500">
            Thank you for taking the exam. You can now close the application.
          </p>
        </div>

        {/* Close App Button */}
        <button
          onClick={closeApp}
          className="px-6 py-2 mt-6 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Close App
        </button>
      </div>
    </div>
  );
}
