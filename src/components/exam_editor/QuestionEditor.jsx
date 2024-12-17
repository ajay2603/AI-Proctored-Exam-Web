import { useContext } from "react";
import { QuestionsContext } from "../../providers/exam_questions";

export default function QuestionEditor() {
  const { questions, setQuestions } = useContext(QuestionsContext);

  return <div className="flex flex-col w-full "></div>;
}
