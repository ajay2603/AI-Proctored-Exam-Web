const server = import.meta.env.VITE_SERVER;
import axios from "axios";
import generateToken from "./auth/generate_token";

export default async function authorizedPost(
  path,
  body = {},
  accessToken,
  dispatch,
  isReVerified = false
) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${server}${path}`, body, {
        withCredentials: true,
        headers: { Authorization: `${accessToken}` },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err.status === 401 && !isReVerified)
          generateToken(dispatch)
            .then((res) =>
              authorizedPost(path, body, res.data.accessToken, dispatch, true)
                .then((res) => resolve(res))
                .catch((err) => reject(err))
            )
            .catch((err) => {
              console.error(err);
              reject(err);
            });
        console.error(err);
        reject(err);
      });
  });
}