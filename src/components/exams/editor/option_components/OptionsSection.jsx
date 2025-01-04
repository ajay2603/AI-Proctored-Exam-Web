import OptionText from "./OptionText";
import OptionImage from "./OptionImage";

export default function OptionsSection({
  currentQuestion,
  setCurrentQuestion,
}) {
  const handleAddOption = () => {
    setCurrentQuestion((prev) => ({
      ...prev,
      option: [...prev.option, [{ type: "text", content: "" }]],
    }));
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = currentQuestion.option.filter(
      (_, optionIndex) => optionIndex !== index
    );
    setCurrentQuestion({
      ...currentQuestion,
      option: updatedOptions,
      answer: currentQuestion.answer === index ? null : currentQuestion.answer,
    });
  };

  const handleRemoveContext = (index, optionIndex) => {
    const updatedOptions = currentQuestion.option.map((option, i) => {
      if (i === optionIndex) {
        return option.filter((_, j) => j !== index);
      }
      return option;
    });
    setCurrentQuestion((prev) => ({
      ...prev,
      option: updatedOptions,
      answer: prev.answer === optionIndex ? null : prev.answer,
    }));
  };

  const handleAddContext = (e, optionIndex) => {
    const contextType = e.target.value;
    const newContext = { type: contextType, content: "" };
    const updatedOptions = currentQuestion.option.map((option, i) => {
      if (i === optionIndex) {
        return [...option, newContext];
      }
      return option;
    });
    setCurrentQuestion((prev) => ({ ...prev, option: updatedOptions }));
  };

  const updateContent = (index, newContent, optionIndex) => {
    const updatedOptions = currentQuestion.option.map((option, i) => {
      if (i === optionIndex) {
        return option.map((item, j) =>
          j === index ? { ...item, content: newContent } : item
        );
      }
      return option;
    });
    setCurrentQuestion((prev) => ({ ...prev, option: updatedOptions }));
  };

  return (
    <div className="flex flex-col w-full p-6 bg-white border-l-4 border-purple-400 shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-700">Options</h2>
      {currentQuestion.option.map((option, optionIndex) => (
        <div key={optionIndex} className="space-y-4">
          <h3 className="text-xl font-medium text-gray-600">
            Option {optionIndex + 1}
          </h3>
          {option.map((context, index) => {
            if (context.type === "text") {
              return (
                <OptionText
                  key={index}
                  index={index}
                  optionIndex={optionIndex}
                  removeContext={() => handleRemoveContext(index, optionIndex)}
                  content={context.content}
                  updateContent={(newContent) =>
                    updateContent(index, newContent, optionIndex)
                  }
                />
              );
            }
            if (context.type === "image") {
              return (
                <OptionImage
                  key={index}
                  index={index}
                  optionIndex={optionIndex}
                  removeContext={() => handleRemoveContext(index, optionIndex)}
                  content={context.content}
                  updateContent={(newContent) =>
                    updateContent(index, newContent, optionIndex)
                  }
                />
              );
            }
            return null;
          })}

          <div className="flex items-center">
            <input
              type="radio"
              name="answer"
              value={optionIndex}
              checked={currentQuestion.answer === optionIndex}
              onChange={() =>
                setCurrentQuestion({ ...currentQuestion, answer: optionIndex })
              }
            />
            <label className="ml-2 text-gray-600">Select as answer</label>
          </div>

          <div className="flex justify-end mt-4">
            <select
              className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md focus:outline-none hover:bg-blue-500"
              value={""}
              onChange={(e) => handleAddContext(e, optionIndex)}
            >
              <option value={""}>Add Context to Option</option>
              <option value={"text"}>Text</option>
              <option value={"image"}>Image</option>
            </select>
          </div>

          <button
            className="w-full px-6 py-3 mt-4 text-white transition duration-150 bg-red-600 rounded-lg shadow-md focus:outline-none hover:bg-red-500 active:bg-red-700"
            onClick={() => handleRemoveOption(optionIndex)}
          >
            Remove Option
          </button>
        </div>
      ))}
      <button
        className="w-full px-6 py-3 mt-6 text-white transition duration-150 bg-indigo-600 rounded-lg shadow-md focus:outline-none hover:bg-indigo-500 active:bg-indigo-700"
        onClick={handleAddOption}
      >
        Add Option
      </button>
    </div>
  );
}
