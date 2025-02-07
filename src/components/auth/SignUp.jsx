import React, { useState, useRef } from "react";
import VerifyOTP from "./VerifyOTP";
import authPost from "../../api/auth/auth_post";
import axios from "axios"; // Make sure to install axios if you haven't
const server = import.meta.env.VITE_SERVER;

const SignUpForm = ({ setVerificationDetails }) => {
  const [image, setImage] = useState(null); // This holds the image from either file input or camera
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [imageId, setImageId] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!imageId) {
      alert("Upload or Capture Image");
      return;
    }

    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    formData["image"] = imageId;

    console.log(formData);

    try {
      // Add loading effect
      const res = await authPost("/auth/sign-up", formData);
      const data = res.data;
      setVerificationDetails(data)
    } catch (err) {
      if (err.status === 404) alert("Error Connecting Server");
      else {
        console.error(err);
        alert(err.response.data.message);
      }
    } finally {
      // Remove loading effect
    }
  };

  // Function to open the webcam
  const startCamera = async () => {
    setShowPreview(false);
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing webcam:", err);
      alert("Could not access webcam.");
    }
  };

  // Function to capture the image
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    video.srcObject.getTracks().forEach((track) => track.stop()); // Stop camera

    canvas.toBlob((blob) => {
      const imageURL = URL.createObjectURL(blob);
      setCapturedImage(imageURL);
      setShowCamera(false);
      setImage(blob); // Set the captured image as the state
    }, "image/jpeg");
  };

  // Function to retake the picture
  const retakePicture = () => {
    setCapturedImage(null);
    setShowPreview(false); // Clear the captured image
    setShowCamera(true); // Show the camera feed again

    // Restart the camera stream
    startCamera(); // Re-initialize the camera stream
  };

  // Function to upload the image
  const uploadImage = async (imageBlob) => {
    const formData = new FormData();
    formData.append("image", imageBlob);
    formData.append("fileId", imageId);
    try {
      const response = await axios.post(
        `${server}/drive/temp/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const { id } = response.data;
        console.log("Image uploaded successfully, file ID:", id);
        return id; // You can return this ID if you need it for further processing
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

  // Function to handle Confirm button click
  const handleConfirm = async () => {
    if (image) {
      let imageBlob;

      if (capturedImage) {
        // Convert the captured image (blob) to file
        imageBlob = await fetch(capturedImage).then((res) => res.blob());
      } else if (image instanceof Blob) {
        imageBlob = image; // Use the uploaded image
      }

      if (imageBlob) {
        // Upload the image to the server

        fileInputRef.current.value = null;

        try {
          const uploadedFileId = await uploadImage(imageBlob);
          setImageId(uploadedFileId);
          setCapturedImage(null); // Reset captured image
          console.log("Uploaded File ID:", uploadedFileId);
        } catch (err) {
          alert("Error uploding Image");
          console.error(err);
        }
      }
    }
  };

  // Function to handle file input change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the selected image to state
      // Upload the selected file
      try {
        const uploadedFileId = await uploadImage(file);
        setImageId(uploadedFileId);
        console.log("Uploaded File ID:", uploadedFileId);
      } catch (err) {
        alert("Error uploding Image");
        console.error(err);
      }
    }
  };

  const handleShowPreview = () => {
    setCapturedImage(null);
    setShowCamera(false);
    setShowPreview(true);
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

        {/* Hidden file input */}
        <input
          type="file"
          name="image"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange} // Call handleFileChange on file input change
        />

        <div>
          {/* Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Upload Image
          </button>

          {/* Open Camera Button */}
          <button
            type="button"
            onClick={startCamera}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
          >
            Photo
          </button>

          <button
            type="button"
            onClick={() => {
              handleShowPreview();
            }}
            className={` ${
              !imageId ? " hidden" : ""
            } px-4 py-2 text-white bg-green-500 rounded-lg`}
          >
            Preview
          </button>
        </div>

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

      {/* Camera Overlay */}
      {showCamera && !capturedImage && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
          <div className="relative w-[640px] h-[480px] bg-white rounded-lg p-4 flex flex-col items-center">
            <video ref={videoRef} className="w-full h-full rounded-lg" />
            <canvas
              ref={canvasRef}
              className="hidden"
              width="640"
              height="480"
            />

            {/* Shutter Button */}
            <button
              className="absolute px-5 py-2 text-white bg-red-500 rounded-full bottom-4"
              onClick={captureImage}
            >
              📸 Capture
            </button>

            {/* Close Button */}
            <button
              className="absolute px-3 py-1 text-white bg-gray-700 rounded top-2 right-2"
              onClick={() => setShowCamera(false)}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}

      {/* Image Preview Overlay */}
      {capturedImage && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
          <div className="relative w-[640px] h-[480px] bg-white rounded-lg p-4 flex flex-col items-center">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full rounded-lg"
            />
            <div className="flex gap-3 mt-4">
              <button
                className="px-5 py-2 text-white bg-gray-500 rounded-lg"
                onClick={retakePicture}
              >
                Retake
              </button>
              <button
                className="px-5 py-2 text-white bg-blue-500 rounded-lg"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
            {/* Close Button */}
            <button
              className="absolute px-3 py-1 text-white bg-gray-700 rounded top-2 right-2"
              onClick={() => setCapturedImage(null)}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}

      {showPreview && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
          <div className="relative w-[640px] h-[480px] bg-white rounded-lg p-4 flex flex-col items-center">
            <img
              src={`http://localhost:3000/drive/image/${imageId}`}
              alt="Captured"
              className="w-full h-full rounded-lg"
            />

            {/* Close Button */}
            <button
              className="absolute px-3 py-1 text-white bg-gray-700 rounded top-2 right-2"
              onClick={() => setShowPreview(null)}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
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
