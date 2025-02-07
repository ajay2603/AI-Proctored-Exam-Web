import { useState, useContext, useEffect, useRef } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { DesktopContext } from "../../providers/Desktop";
import { useNavigate } from "react-router-dom";

export default function SystemVerification() {
  const [webcamAccess, setWebcamAccess] = useState(null);
  const [micAccess, setMicAccess] = useState(null);
  const [audioData, setAudioData] = useState([]);
  const [mediaStream, setMediaStream] = useState(null);
  const [isExamStarted, setIsExamStarted] = useState(false); // New state for button control
  const navigate = useNavigate();
  var prevStream = null;
  const {
    isValidToken,
    runningTokenValidation,
    isServerRunning,
    isEncodingFace,
  } = useContext(DesktopContext);
  const videoRef = useRef(null);

  const checkSystem = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (prevStream) {
          console.log("stoppe sstream");
          prevStream.getTracks().forEach((track) => {
            track.stop();
          });
        }
        console.log("new - st");
        prevStream = stream;
        setWebcamAccess(true);
        setMicAccess(true);
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 32;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const updateAudioBars = () => {
          analyser.getByteFrequencyData(dataArray);
          setAudioData([...dataArray]);
          requestAnimationFrame(updateAudioBars);
        };
        updateAudioBars();
      })
      .catch((err) => {
        setWebcamAccess(false);
        setMicAccess(false);
        console.error("Error accessing media devices:", err);
      });
  };

  const stopMediaStream = () => {
    if (mediaStream) {
      // Stop all tracks
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
      setMediaStream(null);
      navigate("/app/pre-exam", { replace: true });
      // Clear video source
    }
  };

  const handleStartExam = () => {
    if (
      webcamAccess &&
      micAccess &&
      isValidToken &&
      isServerRunning &&
      isEncodingFace
    ) {
      // Stop the media stream before navigation
      stopMediaStream();

      alert("Start Exam");
      //navigate("/app/pre-exam", { replace: true });
    } else {
      alert("Missing Requirements");
    }
  };

  useEffect(() => {
    checkSystem();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-lg p-8 text-center bg-white shadow-xl rounded-2xl">
        <h1 className="mb-6 text-2xl font-bold">System Check</h1>
        <div className="flex items-center justify-between px-4 py-3 mb-4 rounded-md bg-gray-50">
          <span className="text-lg font-medium">Webcam Access</span>
          {webcamAccess === null ? (
            "Checking..."
          ) : webcamAccess ? (
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
          ) : (
            <XCircleIcon className="w-6 h-6 text-red-500" />
          )}
        </div>

        {webcamAccess && (
          <div className="mb-4">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full rounded-md shadow"
            />
          </div>
        )}

        <div className="flex items-center justify-between px-4 py-3 mb-4 rounded-md bg-gray-50">
          <span className="text-lg font-medium">Microphone Access</span>
          {micAccess === null ? (
            "Checking..."
          ) : micAccess ? (
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
          ) : (
            <XCircleIcon className="w-6 h-6 text-red-500" />
          )}
        </div>

        {micAccess && (
          <div className="flex items-center justify-center w-full h-16 overflow-hidden bg-gray-200 rounded-md">
            <div className="flex items-end h-full gap-1 p-2">
              {audioData.slice(0, 16).map((val, i) => (
                <div
                  key={i}
                  className="w-2 bg-green-500"
                  style={{ height: `${(val / 255) * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between px-4 py-3 mt-4 mb-4 rounded-md bg-gray-50">
          <span className="text-lg font-medium">User Authentication</span>
          {runningTokenValidation ? (
            "Verifying..."
          ) : isValidToken ? (
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
          ) : (
            <XCircleIcon className="w-6 h-6 text-red-500" />
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-3 mt-4 mb-4 rounded-md bg-gray-50">
          <span className="text-lg font-medium">AI-Server Running</span>
          {isServerRunning === null ? (
            "starting server..."
          ) : isServerRunning ? (
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
          ) : (
            <XCircleIcon className="w-6 h-6 text-red-500" />
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-3 mt-4 mb-4 rounded-md bg-gray-50">
          <span className="text-lg font-medium">User Image Encoded</span>
          {isEncodingFace === null ? (
            "encoding face..."
          ) : isServerRunning ? (
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
          ) : (
            <XCircleIcon className="w-6 h-6 text-red-500" />
          )}
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={handleStartExam}
            disabled={isExamStarted} // Disable button when exam started
            className="w-full py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-400"
          >
            Start Exam
          </button>
          <button
            onClick={checkSystem}
            className="w-full py-2 font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Re-check
          </button>
        </div>
      </div>
    </div>
  );
}
