import axios from "axios";

const baseUrl = "https://kanbanbackendpleasework.azurewebsites.net";
export const kanbanApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});


