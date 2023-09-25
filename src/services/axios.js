import axios from "axios";

export const BASE_URL = "" || process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
