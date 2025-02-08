import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authorizedGet from "../api/authorized_get";
// Create Context
export const QuestionsContext = createContext();

// Provider Component
export const QuestionsProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: [],
    option: [],
    answer: null,
  });
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.userToken.accessToken);

  const fetchQuestions = async () => {
    if (!id || !accessToken) return;
    // Prevent unnecessary API calls

    try {
      const res = await authorizedGet(
        `/exam/read/questions/${id}`,
        {},
        accessToken,
        dispatch
      );

      if (res?.data?.questions) {
        setQuestions(res.data.questions);
      } else {
        console.warn("No data received from API");
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      alert(err?.response?.data?.message || "Unexpected error occurred");
    }
  };

  useEffect(() => {
    console.log(id);
    fetchQuestions();
  }, [id, accessToken]);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions,
        currentQuestion,
        setCurrentQuestion,
        id,
        setId,
        fetchQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
