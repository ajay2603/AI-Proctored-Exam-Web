import { useState } from "react";
import authPost from "../../api/auth/auth_post";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    try {
      //add loading effect
      const res = await authPost("/auth/sign-in", formData);
      const redirectPath = searchParams.get("redirect");
      if (redirectPath) {
        location.replace(redirectPath);
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (err.status === 404) alert("Error Connecting Server");
      else {
        console.error(err);
        alert(err.response.data.message);
      }
    } finally {
      //remove loading effect
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 h-fit">
      <div className="w-fit">
        <h1 className="text-center logsupTxt logsupHeading">Sign In</h1>
      </div>
      <form
        className="flex flex-col w-full gap-5"
        onSubmit={(e) => handleLogin(e)}
      >
        <div>
          <input
            type="email"
            name="email"
            className="txt-input logsupTxt "
            placeholder="User Name"
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            className="txt-input logsupTxt"
            placeholder="Password"
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            required
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            className=" text-2xl logsupTxt rounded-lg logsupTxt bg-[#493196] px-3 py-2 w-[200px] text-white hover:bg-[#563da5] transition-all duration-[0.2s] hover:-translate-y-1"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
