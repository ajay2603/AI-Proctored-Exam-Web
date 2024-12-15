import { Route, Routes } from "react-router-dom";
import NewExam from "../pages/NewExam";
import ExamEditor from "../pages/ExamEditior";

export default function ExamRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Exams</h1>} />
      <Route path="/new" element={<NewExam />} />
      <Route path="/editor/:id" element={<ExamEditor />} />
    </Routes>
  );
}
