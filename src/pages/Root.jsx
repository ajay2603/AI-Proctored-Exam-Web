import { useEffect } from "react";
import generateToken from "../api/auth/generate_token";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const generate_token = async () => {
    try {
      const res = await generateToken(dispatch);
      console.log(res);
      navigation("/home");
    } catch (err) {
      console.log(err);
      navigation("/auth");
    }
  };

  useEffect(() => {
    generate_token();
  }, []);

  return <h1>Root</h1>;
}
