import { Routes, Route } from "react-router-dom";
import SystemVerification from "./SystemVerification";
import PreExam from "./PreExam";
import DesktopProvider from "../../providers/Desktop";
import DesktopExamProvider from "../../providers/DesktopExam";
import PostExam from "./PostExam";
import Exam from "./Exam";
export default function Desktop() {
  return (
    <>
      <DesktopProvider>
        <DesktopExamProvider>
          <Routes>
            <Route path="/" element={<SystemVerification />} />
            <Route path="/pre-exam" element={<PreExam />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/post-exam" element={<PostExam />} />
          </Routes>
        </DesktopExamProvider>
      </DesktopProvider>
    </>
  );
}
