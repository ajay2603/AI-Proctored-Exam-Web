import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import ExamRoutes from "./ExamRoutes";
import generateToken from "../api/auth/generate_token";

export default function UserRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath == "/") {
      return;
    }
    generateToken(dispatch)
      .then((_) => {
        /*any logic if needed */
      })
      .catch((err) => {
        console.error(err);
        if (err.status == 401) {
          navigate(`/auth?redirect=${currentPath}`);
        } else {
          if (err.status === 404) alert("Error Connecting Server");
          else alert(err.response.data.message);
        }
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/exams/*" element={<ExamRoutes />} />
    </Routes>
  );
}
