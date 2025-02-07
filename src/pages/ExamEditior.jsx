import React from "react";
import Split from "react-split";
import { QuestionsContext } from "../providers/exam_questions";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import QuestionEditor from "../components/exams/editor/QuestionEditor";
import QuestionPreview from "../components/exams/preview/QuestionPreview";

export default function ExamEditor() {
  const { id } = useParams();
  const { questions } = useContext(QuestionsContext);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Split component */}
      <Split
        className="flex h-full"
        sizes={[50, 50]} // Default sizes in percentage
        minSize={200} // Minimum width of each pane
        gutterSize={4} // Thickness of the resizer
        direction="horizontal" // Horizontal split
      >
        {/* Left Pane */}
        <div className="flex flex-col h-full overflow-auto">
          <QuestionEditor />
        </div>

        {/* Right Pane */}
        <div className="flex flex-col h-full overflow-auto">
          <QuestionPreview questions={questions} />
        </div>
      </Split>
    </div>
  );
}
