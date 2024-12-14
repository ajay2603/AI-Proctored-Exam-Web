import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import generateToken from "../api/auth/generate_token";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function UserRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
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
          else alert(err.response.message);
        }
      });
  });

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
