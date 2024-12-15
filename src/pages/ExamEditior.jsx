import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ExamEditor() {
  const { id } = useParams();

  return (
    <>
      <h1>Exam Editor</h1>
      <h2>{id}</h2>
    </>
  );
}
