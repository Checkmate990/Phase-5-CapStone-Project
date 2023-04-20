import axios from "axios";

let BASE_URL = "https://c21a-116-206-164-138.in.ngrok.io";
// let BASE_URL = "https://brasaorosa-be.herokuapp.com";

export default function axiosClient() {
  let defaultOptions = {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json",
    },
  };
  let instance = axios.create(defaultOptions);

  //Set the AUTH token for any request

  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token;
    config.headers.common = {
      "x-auth-token": `${localStorage.getItem("token")}`,
    };
    return config;
  });
  return instance;
}
