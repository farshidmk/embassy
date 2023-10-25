import axios from "axios";

export const BASE_URL = "http://37.156.145.155:8000" || process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
});
