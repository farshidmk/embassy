import axios from "axios";

export const BASE_URL = "" || process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   xsrfCookieName: "csrftoken",
//   xsrfHeaderName: "X-CSRFToken",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
