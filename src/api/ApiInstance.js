import axios from "axios";

const baseUrl = "http://localhost:5093";
export const kanbanApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});


