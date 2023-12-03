import { createApi } from "@reduxjs/toolkit/query/react";
import { kanbanApi } from "./ApiInstance.js";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    console.log(data);
    try {
      const result = await kanbanApi({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      console.log("here");
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const kanbanReduxApi = createApi({
  reducerPath: "kanbanReduxApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:5093/",
  }),
  tagTypes: ["Board", "AllBoards", "AllTeams", "ActiveTeam"],
  endpoints(builder) {
    return {
      getActiveBoard: builder.query({
        query: (payload) => ({
          url: `api/board?id=${payload}`,
          method: "get",
          data: payload,
        }),
        providesTags: ["Board"],
      }),
      updateBoard: builder.mutation({
        query: ({ id, data }) => ({
          url: `api/board?id=${id}`,
          method: "PUT",
          data: data,
        }),
        invalidatesTags: ["Board"],
      }),
      updateCard: builder.mutation({
        query: ({ id, data }) => ({
          url: `api/board/updateCard?boardId=${id}`,
          method: "PUT",
          data: data,
        }),
        invalidatesTags: ["Board"],
      }),
      addCard: builder.mutation({
        query: ({ id, data }) => ({
          url: `api/board/addCard?boardId=${id}`,
          method: "PUT",
          data: data,
        }),
        invalidatesTags: ["Board"],
      }),
      addColumn: builder.mutation({
        query: ({ id, data }) => ({
          url: `api/board/addColumn?boardId=${id}&columnName=${data}`,
          method: "PUT",
          data: data,
        }),
        invalidatesTags: ["Board"],
      }),
      deleteColumn: builder.mutation({
        query: ({ boardId, columnId }) => ({
          url: `api/board/deleteColumn?boardId=${boardId}&columnId=${columnId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Board"],
      }),
      deleteCard: builder.mutation({
        query: ({ boardId, containerId, cardId }) => ({
          url: `api/board/deleteCard?boardId=${boardId}&containerId=${containerId}&cardId=${cardId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Board"],
      }),
      getBoards: builder.query({
        query: () => ({
          url: "api/content/kanban",
          method: "get",
        }),
        providesTags: ["AllBoards"],
      }),
      getTeams: builder.query({
        query: () => ({
          url: "api/content/teams",
          method: "get",
        }),
        providesTags: ["AllTeams"],
      }),
      createTeam: builder.mutation({
        query: ( data ) => ({
          url: "api/team/createTeam",
          method: "POST",
          data: data,
        }),
        invalidatesTags: ["AllTeams"],
      }),
      getTeam: builder.query({
        query: (payload) => ({
          url: `api/team/getTeam?teamId=${payload}`,
          method: "get",
        }),
        providesTags: ["ActiveTeam"],
      }),
      deleteUserFromTeam: builder.mutation({
        query: ({ teamId, internalUserId }) => ({
          url: `api/team/removeMember?teamId=${teamId}&teamUserId=${internalUserId}`,
          method: "DELETE",
          // data: payload,
        }),
        invalidatesTags: ["ActiveTeam", "AllTeams"],
      }),
      addUserToTeam: builder.mutation({
        query: (payload) => ({
          url: `api/team/addMember`,
          method: "POST",
          data: payload,
        }),
        invalidatesTags: ["ActiveTeam", "AllTeams"],
      }),
      createNewBoard: builder.mutation({
        query: (payload) => ({
          url: `api/team/addProject`,
          method: "POST",
          data: payload,
        }),
        invalidatesTags: ["AllBoards"],
      }),
      deleteTeamBoard: builder.mutation({
        query: ({ teamId, boardId }) => ({
          url: `api/team/deleteBoard?teamId=${teamId}&boardId=${boardId}`,
          method: "DELETE",
          // data: payload,
        }),
        invalidatesTags: ["ActiveTeam", "AllTeams", "AllBoards"],
      }),
      deleteTeam: builder.mutation({
        query: ({teamId}) => ({
          url: `api/team/deleteTeam?teamId=${teamId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ActiveTeam", "AllTeams", "AllBoards"],
      }),
    };
  },
});

export const {
  useGetActiveBoardQuery,
  useUpdateBoardMutation,
  useUpdateCardMutation,
  useAddCardMutation,
  useAddColumnMutation,
  useDeleteColumnMutation,
  useDeleteCardMutation,
  useGetBoardsQuery,
  useGetTeamsQuery,
  useCreateTeamMutation,
  useGetTeamQuery,
  useDeleteUserFromTeamMutation,
  useAddUserToTeamMutation,
  useCreateNewBoardMutation,
  useDeleteTeamBoardMutation,
  useDeleteTeamMutation,
} = kanbanReduxApi;
