import { useState } from "react";

const OptionText = ({
  index,
  optionIndex,
  removeContext,
  content,
  updateContent,
}) => {
  const [textContent, setTextContent] = useState(content);

  const handleTextChange = (e) => {
    setTextContent(e.target.value);
    updateContent(e.target.value);
  };

  return (
    <div className="flex gap-4 my-4">
      <textarea
        className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-500"
        value={textContent}
        onChange={handleTextChange}
        placeholder="Enter option content"
      />
      <span
        className="flex items-center justify-center w-8 h-8 text-white bg-red-600 rounded-full cursor-pointer"
        onClick={removeContext}
      >
        X
      </span>
    </div>
  );
};

export default OptionText;
