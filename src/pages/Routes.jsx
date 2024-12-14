import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./Home";
import LandingPage from "./LandingPage";
import generateToken from "../api/auth/generate_token";

export default function UserRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    console.log(currentPath);
    if (currentPath == "/") {
      return;
    }
    generateToken(dispatch)
      .then((_) => {
        console.log("User Verified");
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
    </Routes>
  );
}
