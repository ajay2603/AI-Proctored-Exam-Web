import { createContext, useState } from "react";

// Create Context
export const QuestionsContext = createContext();

// Provider Component
export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState({});

  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
};
