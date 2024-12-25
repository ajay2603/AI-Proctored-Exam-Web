import { useContext, useState } from "react";
import { QuestionsContext } from "../../providers/exam_questions";
import QuestionText from "./QuestionText";
import QuestionImage from "./QuestionImage";
import OptionText from "./OptionText";
import OptionImage from "./OptionImage";

export default function QuestionEditor() {
  const { questions, setQuestions } = useContext(QuestionsContext);

  const [currentQuestion, setCurrentQuestion] = useState({
    question: [],
    option: [],
    answer: null,
  });

  const handleRemoveContextQuestion = (index) => {
    setCurrentQuestion({
      ...currentQuestion,
      question: currentQuestion.question.filter((_, i) => i !== index),
    });
  };

  const handleAddContext = (e, type, optionIndex = null) => {
    const contextType = e.target.value;

    if (contextType === "text") {
      if (type === "question") {
        setCurrentQuestion({
          ...currentQuestion,
          question: [
            ...currentQuestion.question,
            { type: "text", content: "" },
          ],
        });
      } else if (type === "option" && optionIndex !== null) {
        const updatedOptions = [...currentQuestion.option];
        updatedOptions[optionIndex].push({ type: "text", content: "" });
        setCurrentQuestion({
          ...currentQuestion,
          option: updatedOptions,
        });
      }
    } else if (contextType === "image") {
      if (type === "question") {
        setCurrentQuestion({
          ...currentQuestion,
          question: [
            ...currentQuestion.question,
            { type: "image", content: "" },
          ],
        });
      } else if (type === "option" && optionIndex !== null) {
        const updatedOptions = [...currentQuestion.option];
        updatedOptions[optionIndex].push({ type: "image", content: "" });
        setCurrentQuestion({
          ...currentQuestion,
          option: updatedOptions,
        });
      }
    }
  };

  const updateContent = (index, newContent, type, optionIndex = null) => {
    if (type === "question") {
      setCurrentQuestion((prev) => {
        const updatedQuestions = prev.question.map((item, i) =>
          i === index ? { ...item, content: newContent } : item
        );
        return { ...prev, question: updatedQuestions };
      });
    } else if (type === "option" && optionIndex !== null) {
      setCurrentQuestion((prev) => {
        const updatedOptions = prev.option.map((option, i) => {
          if (i === optionIndex) {
            const updatedOption = option.map((item, j) =>
              j === index ? { ...item, content: newContent } : item
            );
            return updatedOption;
          }
          return option;
        });
        return { ...prev, option: updatedOptions };
      });
    }
  };

  const handleRemoveContext = (index, type, optionIndex = null) => {
    if (type === "question") {
      setCurrentQuestion({
        ...currentQuestion,
        question: currentQuestion.question.filter((_, i) => i !== index),
      });
    } else if (type === "option" && optionIndex !== null) {
      const updatedOptions = [...currentQuestion.option];
      updatedOptions[optionIndex] = updatedOptions[optionIndex].filter(
        (_, i) => i !== index
      );

      if (currentQuestion.answer === optionIndex) {
        setCurrentQuestion({
          ...currentQuestion,
          option: updatedOptions,
          answer: null, // Reset answer when the selected option is removed
        });
      } else {
        setCurrentQuestion({
          ...currentQuestion,
          option: updatedOptions,
        });
      }
    }
  };

  const handleAddOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      option: [...currentQuestion.option, [{ type: "text", content: "" }]],
    });
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = currentQuestion.option.filter(
      (_, optionIndex) => optionIndex !== index
    );
    setCurrentQuestion({
      ...currentQuestion,
      option: updatedOptions,
      answer: currentQuestion.answer === index ? null : currentQuestion.answer, // Reset answer if removed option is selected
    });
  };

  return (
    <div className="flex flex-col items-center w-full p-4 bg-blue-50">
      <div className="flex flex-col w-11/12 space-y-6">
        {/* Question Section */}
        <div className="flex flex-col w-full p-6 bg-white border-l-4 border-green-400 shadow-lg rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-700">Question</h2>
          <div>
            {currentQuestion.question.map((context, index) => {
              if (context.type === "text") {
                return (
                  <QuestionText
                    key={index}
                    index={index}
                    removeContext={() => handleRemoveContext(index, "question")}
                    content={context.content}
                    updateContent={(newContent) =>
                      updateContent(index, newContent, "question")
                    }
                  />
                );
              }
              if (context.type === "image") {
                return (
                  <QuestionImage
                    key={index}
                    index={index}
                    removeContext={() => handleRemoveContext(index, "question")}
                    content={context.content}
                    updateContent={(newContent) =>
                      updateContent(index, newContent, "question")
                    }
                  />
                );
              }
              return null;
            })}
          </div>

          <div className="flex justify-end mt-4">
            <select
              className="px-4 py-2 text-white bg-green-600 rounded-lg shadow-md focus:outline-none hover:bg-green-500"
              value={""}
              onChange={(e) => handleAddContext(e, "question")}
            >
              <option value={""}>Add Context</option>
              <option value={"text"}>Text</option>
              <option value={"image"}>Image</option>
            </select>
          </div>
        </div>

        {/* Options Section */}
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
                      removeContext={() =>
                        handleRemoveContext(index, "option", optionIndex)
                      }
                      content={context.content}
                      updateContent={(newContent) =>
                        updateContent(index, newContent, "option", optionIndex)
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
                      removeContext={() =>
                        handleRemoveContext(index, "option", optionIndex)
                      }
                      content={context.content}
                      updateContent={(newContent) =>
                        updateContent(index, newContent, "option", optionIndex)
                      }
                    />
                  );
                }
                return null;
              })}

              {/* Radio button to select this option as the answer */}
              <div className="flex items-center">
                <input
                  type="radio"
                  name="answer"
                  value={optionIndex}
                  checked={currentQuestion.answer === optionIndex}
                  onChange={() =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      answer: optionIndex,
                    })
                  }
                />
                <label className="ml-2 text-gray-600">Select as answer</label>
              </div>

              <div className="flex justify-end mt-4">
                <select
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md focus:outline-none hover:bg-blue-500"
                  value={""}
                  onChange={(e) => handleAddContext(e, "option", optionIndex)}
                >
                  <option value={""}>Add Context to Option</option>
                  <option value={"text"}>Text</option>
                  <option value={"image"}>Image</option>
                </select>
              </div>

              {/* Remove Option Button */}
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
      </div>
    </div>
  );
}
