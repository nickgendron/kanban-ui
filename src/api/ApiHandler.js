import { kanbanApi } from "./ApiInstance.js";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const KanbanApi = {
  async getRemoteAsset(endpoint, payload) {
    try {
      const response = await kanbanApi.get(endpoint, payload);

      return response.data;
    } catch (error) {}
  },
  async postRemoteAsset(endpoint, payload) {
    try {
      const response = await kanbanApi.post(endpoint, payload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async login(payload) {
    try {
      const response = await kanbanApi.post("/api/user/login", payload);
      const cookies = response.headers;

      // Do something with the cookies

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async signup(payload) {
    try {
      const response = await kanbanApi.post("/api/user/signup", payload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async updateBoard(endpoint, payload) {
    try {
      const response = await kanbanApi.put(endpoint, payload);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5093/api/', fetchFn: KanbanApi.getRemoteAsset }), // Assuming `fetch` is your API method
//   endpoints: (builder) => ({
//     getActiveBoard: builder.query({
//       query: (payload) => `board?id=${payload}`,
//     }),
//     // Add other endpoints as needed
//   }),
// });

// export const { useGetActiveBoardQuery } = api;
