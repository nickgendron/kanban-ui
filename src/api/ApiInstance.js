import axios from "axios";

const baseUrl = "https://kanbanbackend-final.azurewebsites.net";
export const kanbanApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});


