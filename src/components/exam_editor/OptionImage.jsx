import { useState } from "react";

const OptionImage = ({
  index,
  optionIndex,
  removeContext,
  content,
  updateContent,
}) => {
  const [image, setImage] = useState(content);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      updateContent(imageUrl);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      updateContent(imageUrl);
    }
  };

  return (
    <div className="flex gap-4 my-4">
      <div
        className="relative flex items-center justify-center w-full h-40 border-2 border-blue-400 border-dashed rounded-lg bg-blue-50"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <span className="text-gray-500">
            Drag & Drop or Click to Upload Image
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </div>
      <span
        className="flex items-center justify-center w-8 h-8 text-white bg-red-600 rounded-full cursor-pointer"
        onClick={removeContext}
      >
        X
      </span>
    </div>
  );
};

export default OptionImage;
