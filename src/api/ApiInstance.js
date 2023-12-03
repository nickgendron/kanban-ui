import axios from "axios";

const baseUrl = "https//kiblbackendfinal.azurewebsites.net";
export const kanbanApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});


