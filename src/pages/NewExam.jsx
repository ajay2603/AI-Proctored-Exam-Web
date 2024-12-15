import { useSelector } from "react-redux";
import authorizedPost from "../api/authorized_post";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ExamRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.userToken.accessToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    try {
      const res = await authorizedPost(
        "/exam/create",
        formData,
        accessToken,
        dispatch
      );
      alert(res.data.message);
      navigate(`/exams/editor/${res.data.id}`);
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
    <div className="flex items-center justify-center w-screen h-screen bg-blue-500">
      <div className="p-5 py-10 bg-white shadow-xl rounded-xl shadow-black">
        <h1 className="text-center logsupTxt logsupHeading">Create Exam</h1>
        <form className="flex flex-col gap-5 mt-5 " onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 ">
            <label className="pl-2 text-lg font-semibold logsupTxt">
              Enter Exam Title
            </label>
            <input
              type="text"
              name="title"
              className="txt-input logsupTxt"
              placeholder="Exam Title"
            ></input>
          </div>

          <div className="flex justify-center w-full">
            <button className=" m-auto text-2xl logsupTxt rounded-lg logsupTxt bg-[#493196] px-3 py-2 w-[200px] text-white transition-all duration-[0.2s] hover:bg-[#563da5] hover:-translate-y-1">
              Create Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
