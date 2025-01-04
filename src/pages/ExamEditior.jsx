import React from "react";
import SplitPane from "react-split-pane";
import { QuestionsContext } from "../providers/exam_questions";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import QuestionEditor from "../components/exams/editor/QuestionEditor";

export default function ExamEditor() {
  const { id } = useParams();
  const { questions } = useContext(QuestionsContext);

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* SplitPane component */}
      <SplitPane
        split="vertical" // Split direction: vertical
        minSize={200} // Minimum size of panes
        defaultSize="50%" // Default split at 50%
        resizerStyle={{
          background: "#ccc",
          cursor: "col-resize",
          width: "4px",
        }}
      >
        {/* Left Pane */}
        <div
          className="overflow-auto"
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <QuestionEditor />
        </div>

        {/* Right Pane */}
        <div style={{ padding: "1rem", backgroundColor: "#e0e0e0" }}>
          <h2>Exam ID</h2>
          <p>{id}</p>
        </div>
      </SplitPane>
    </div>
  );
}
