import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

export const AppExamContext = createContext();

export default function DesktopExamProvider({ children }) {
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});
  const [warningsLeft, setWarningsLeft] = useState(5);
  const [score, setScore] = useState(null);

  return (
    <AppExamContext.Provider
      value={{
        questions,
        setQuestions,
        answers,
        setAnswers,
        warningsLeft,
        setWarningsLeft,
        setScore,
        score,
      }}
    >
      {children}
    </AppExamContext.Provider>
  );
}
