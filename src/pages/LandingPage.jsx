import { useEffect } from "react";
import generateToken from "../api/auth/generate_token";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const generate_token = async () => {
    try {
      const res = await generateToken(dispatch);
      console.log(res);
    } catch (err) {
      console.log(err);
      navigation("/auth");
    }
  };

  useEffect(() => {
    generate_token();
  }, []);

  return <h1>Landing Page</h1>;
}
