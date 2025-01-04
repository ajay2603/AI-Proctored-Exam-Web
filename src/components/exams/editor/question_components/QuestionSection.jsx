import QuestionText from "./QuestionText";
import QuestionImage from "./QuestionImage";

export default function QuestionSection({
  currentQuestion,
  setCurrentQuestion,
}) {
  const handleRemoveContext = (index) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      question: prev.question.filter((_, i) => i !== index),
    }));
  };

  const handleAddContext = (e) => {
    const contextType = e.target.value;
    const newContext = { type: contextType, content: "" };
    setCurrentQuestion((prev) => ({
      ...prev,
      question: [...prev.question, newContext],
    }));
  };

  const updateContent = (index, newContent) => {
    setCurrentQuestion((prev) => {
      const updatedQuestions = prev.question.map((item, i) =>
        i === index ? { ...item, content: newContent } : item
      );
      return { ...prev, question: updatedQuestions };
    });
  };

  return (
    <div className="flex flex-col w-full p-6 bg-white border-l-4 border-green-400 shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-700">Question</h2>
      <div>
        {currentQuestion.question.map((context, index) => {
          if (context.type === "text") {
            return (
              <QuestionText
                key={index}
                index={index}
                removeContext={() => handleRemoveContext(index)}
                content={context.content}
                updateContent={(newContent) => updateContent(index, newContent)}
              />
            );
          }
          if (context.type === "image") {
            return (
              <QuestionImage
                key={index}
                questionIndex={index}
                removeQuestionImage={() => handleRemoveContext(index)}
                content={context.content}
                updateContent={(newContent) => updateContent(index, newContent)}
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
          onChange={handleAddContext}
        >
          <option value={""}>Add Context</option>
          <option value={"text"}>Text</option>
          <option value={"image"}>Image</option>
        </select>
      </div>
    </div>
  );
}
