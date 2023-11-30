import axios from "axios";

const baseUrl = "https://106e-167-96-78-179.ngrok-free.app";
export const kanbanApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});


