import axios from "axios";

//Production
const serverUrl = axios.create({
  baseURL: "http://,
  headers: { "Content-Type": "application/json" },
  withCredentials: "true",
});

//Local Development
// const serverUrl = axios.create({
//   baseURL: "http://localhost:3600",
//   headers: { "Content-Type": "application/json" },
//   withCredentials: "true",
// });

export default serverUrl;
