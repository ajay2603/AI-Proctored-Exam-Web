import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionsContext } from "../../../providers/exam_questions";
import QuestionSection from "./question_components/QuestionSection";
import OptionsSection from "./option_components/OptionsSection";
import authorizedPost from "../../../api/authorized_post";
import { useSelector, useDispatch } from "react-redux";

export default function QuestionEditor() {
  const { questions, setQuestions } = useContext(QuestionsContext);
  const accessToken = useSelector((state) => state.userToken.accessToken);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState({
    question: [],
    option: [],
    answer: null,
  });

  useEffect(() => {
    console.log(currentQuestion);
  }, [currentQuestion]);

  const handleSubmit = async () => {
    try {
      console.log("Submitting Question:", currentQuestion);
      console.log("Exam ID:", id);
      const response = await authorizedPost(
        `/exam/create/${id}/question`,
        currentQuestion,
        accessToken,
        dispatch
      );
      console.log("Question submitted successfully!", response);
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4 bg-blue-50">
      <div className="flex flex-col w-11/12 space-y-6">
        <QuestionSection
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
        <OptionsSection
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
        <button
          className="w-full px-6 py-3 mt-6 text-white transition duration-150 bg-green-600 rounded-lg shadow-md focus:outline-none hover:bg-green-500 active:bg-green-700"
          onClick={handleSubmit}
        >
          Submit Question
        </button>
      </div>
    </div>
  );
}
