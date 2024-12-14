import axios from "axios";
const server = import.meta.env.VITE_SERVER;
import { setAccessToken } from "../../redux/features/tokens";

export default async function generateToken(dispatch) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${server}/auth/token-refresh`, {}, { withCredentials: true })
      .then((res) => {
        dispatch(setAccessToken(res.data.accessToken));
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
