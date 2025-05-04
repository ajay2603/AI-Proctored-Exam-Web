import { createContext, useEffect, useState } from "react";
import axios from "axios";
const server = import.meta.env.VITE_SERVER;

import io from "socket.io-client";

const socket = io("http://localhost:5000", {});

export const DesktopContext = createContext();

export default function DesktopProvider({ children }) {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ODgwNDIzOC1mYmI3LTQ4MTktODAyMi1jMDQzZTYxZGE5ZGIiLCJleGFtSWQiOiIwZmVkMzQwZi1kZjY0LTQwYjUtODJjNC04NTg5NzAwZWZlNzciLCJpYXQiOjE3NDAzMTM5Nzd9.XBC2qxrO4Ik5I1ZuazY5i-evOH70axdqZy6Rg_d9U7Q");
  const [isValidToken, setIsValidToken] = useState(false);
  const [runningTokenValidation, setIsRunningTokenValidation] = useState(false);
  const [isServerRunning, setIsServerRunning] = useState(null);
  const [examData, setExamData] = useState(null);
  const [isEncodingFace, setIsFaceEncoding] = useState(null);

  if (window.api) {
    window.api.on((_, data) => {
      console.log("data received");
      console.log(data);
      if (data.event == "token") {
        if (!token) {
          setToken(data.token);
        }
      }
    });
  }

  if (socket) {
    socket.on("connected", () => {
      console.log("To Way Connection");
      setIsServerRunning(true);
    });

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
      setIsServerRunning(false);
    });

    socket.on("encode-face-response", (resp) => {
      console.log(resp);
      setIsFaceEncoding(resp.status);
      if (!resp.status) {
        alert(resp.message);
      }
    });
  }

  const reqEncodeFace = (dat) => {
    console.log(examData);
    console.log(isServerRunning);
    socket.emit("encode-face", dat.user.image);
  };

  useEffect(() => {
    const verifToken = async () => {
      console.log("handling token change");
      console.log(token);
      if (!token) {
        return;
      }
      try {
        setIsRunningTokenValidation(true);
        const response = await axios.post(
          `${server}/auth/exam-token`,
          {},
          {
            withCredentials: true,
            headers: { Authorization: `${token}` },
          }
        );
        setIsValidToken(true);
        console.log(response.data);
        setExamData(response.data);
        reqEncodeFace(response.data);
      } catch (err) {
        console.log("Error Validating the token");
        console.error(err);
      } finally {
        setIsRunningTokenValidation(false);
      }
    };
    if (token) {
      verifToken();
    }
  }, [token]);

  useEffect(() => {
    if (!token && window.api) {
      window.api.send({ event: "get-token" });
    }
  }, []);

  return (
    <DesktopContext.Provider
      value={{
        token,
        setToken,
        isValidToken,
        runningTokenValidation,
        isServerRunning,
        isEncodingFace,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
}

export { socket };
