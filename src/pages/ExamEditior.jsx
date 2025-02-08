import React, { useEffect, useState, useContext } from "react";
import Split from "react-split";
import { QuestionsContext } from "../providers/exam_questions";
import { useParams } from "react-router-dom";
import QuestionEditor from "../components/exams/editor/QuestionEditor";
import QuestionPreview from "../components/exams/preview/QuestionPreview";

export default function ExamEditor() {
  const { id } = useParams();
  const { questions, setId } = useContext(QuestionsContext);

  useEffect(() => {
    console.log(id);
    setId(id);
  }, []);

  const handleRefresh = () => {
    console.info("refreshed");
    fetchQuestions();
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Split
        className="flex h-full"
        sizes={[50, 50]}
        minSize={200}
        gutterSize={4}
        direction="horizontal"
      >
        {/* Left Pane */}
        <div
          className="flex flex-col h-full"
          style={{ overflowY: "auto" }} // Independent scrolling
        >
          <QuestionEditor />
        </div>

        {/* Right Pane */}
        <div
          className="flex flex-col h-full"
          style={{ overflowY: "auto" }} // Independent scrolling
        >
          <QuestionPreview questions={questions} onRefresh={handleRefresh} />
        </div>
      </Split>
    </div>
  );
}
