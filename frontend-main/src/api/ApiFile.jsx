import axios from "axios";

//Production
const serverUrl = axios.create({
  baseURL: "http://44.207.202.196:3600",
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
