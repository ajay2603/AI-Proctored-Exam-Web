import { Route, Routes } from "react-router-dom";
import NewExam from "../pages/NewExam";
import ExamEditor from "../pages/ExamEditior";
import { QuestionsProvider } from "../providers/exam_questions";
import ExamPreparationPage from "../pages/ExamPreparationPage";

export default function ExamRoutes() {
  return (
    <QuestionsProvider>
      <Routes>
        <Route path="/" element={<h1>Exams</h1>} />
        <Route path="/new" element={<NewExam />} />
        <Route path="/editor/:id" element={<ExamEditor />} />
        <Route path="/take" element={<ExamPreparationPage />} />
      </Routes>
    </QuestionsProvider>
  );
}
