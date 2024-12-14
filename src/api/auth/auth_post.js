import axios from "axios";
const server = import.meta.env.VITE_SERVER;

export default async function authPost(path, body={}) {
  
  return new Promise((resolve, reject) => {
    axios
      .post(`${server}${path}`, body, { withCredentials: true })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
