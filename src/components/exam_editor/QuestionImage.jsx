import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authorizedPost from "../../api/authorized_post.js";

const QuestionImage = ({
  questionIndex,
  removeQuestionImage,
  content,
  updateContent,
}) => {
  const [imageId, setImageId] = useState(content);
  const accessToken = useSelector((state) => state.userToken.accessToken);
  const dispatch = useDispatch();

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        // Send the file as FormData
        const response = await authorizedPost(
          "/drive/temp/upload",
          formData,
          accessToken,
          dispatch
        );

        const data = response.data;
        console.log(data);
        setImageId(data.id);
        updateContent(data.id);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex gap-4 my-4">
      <div
        className="relative flex items-center justify-center w-full h-40 border-2 border-blue-400 border-dashed rounded-lg bg-blue-50"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {imageId ? (
          <img
            src={`http://localhost:3000/drive/image/${imageId}`}
            alt="Uploaded"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <span className="text-gray-500">Drag & Drop to Upload Image</span>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => {
            handleDrop({
              preventDefault: () => {},
              dataTransfer: { files: e.target.files },
            });
          }}
        />
      </div>
      <span
        className="flex items-center justify-center w-8 h-8 text-white bg-red-600 rounded-full cursor-pointer"
        onClick={removeQuestionImage}
      >
        X
      </span>
    </div>
  );
};

export default QuestionImage;
