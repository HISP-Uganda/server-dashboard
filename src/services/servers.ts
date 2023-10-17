// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiUrl } from "../utils/helpers";
import { Server, ServerForm } from "../types/server";
import { ScriptForm } from "../types/scripts";

// Define a service using a base URL and expected endpoints
export const serversApi = createApi({
   reducerPath: "serversApi",
   baseQuery: fetchBaseQuery({ baseUrl: getApiUrl() }),
   tagTypes: ["Servers", "ServersWT"],
   endpoints: (builder) => ({
      getAllServers: builder.query<Server[], void>({
         query: () => `servers`,
         providesTags: [{ type: 'Servers', id: "LIST" }],
      }),
      getServerById: builder.query<Server, string>({
         query: (id) => `servers/${id}`,
         providesTags: (result, error, id) => [{ type: 'Servers', id }],
      }),
      connectWebterminal: builder.query<Server, string>({
         query: (id) => `servers/${id}/terminal`,
         providesTags: (result, error, id) => [{ type: 'ServersWT', id }],
      }),
      // ? Mutation: Create a server
      createServer: builder.mutation<Server, ServerForm>({
         query(data) {
            return {
               url: "servers",
               method: "POST",
               // credentials: "include",
               body: data,
            };
         },
         invalidatesTags: [{ type: 'Servers', id: "LIST" }],
         transformResponse: (response: Server ) => {
            console.log(response)
            return response
         }
      }),
      // ? Mutation: Update Server
      updateServer: builder.mutation<Server, { id: string; formData: ServerForm }>({
         query({ id, formData }) {
            return {
               url: `servers/${id}`,
               method: "PUT",
               // credentials: "include",
               body: formData,
            };
         },
         invalidatesTags: (result, error, { id }) =>
            result
               ? [
                    { type: "Servers", id },
                    { type: 'Servers', id: "LIST" }
                 ]
               : [{ type: 'Servers', id: "LIST" }],
         transformResponse: (response: Server ) => response,
      }),
      // ? Mutation: Run script 
      runScript: builder.mutation<Server, { id: string; formData: ScriptForm }>({
         query({ id, formData }) {
            return {
               url: `servers/${id}/run`,
               method: "POST",
               // credentials: "include",
               body: formData,
            };
         },
         invalidatesTags: (result, error, { id }) =>
            result
               ? [
                    { type: "Servers", id },
                    { type: 'Servers', id: "LIST" }
                 ]
               : [{ type: 'Servers', id: "LIST" }],
         transformResponse: (response: Server ) => response,
      }),
      // ? Mutation: Delete server
      deleteServer: builder.mutation<null, string>({
         query(id) {
            return {
               url: `servers/${id}`,
               method: "DELETE",
               // credentials: "include",
            };
         },
         invalidatesTags: [{ type: 'Servers', id: "LIST" }],
      }),
   }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
   useGetAllServersQuery,
   useCreateServerMutation,
   useDeleteServerMutation,
   useUpdateServerMutation,
   useRunScriptMutation,
   useGetServerByIdQuery,
   useConnectWebterminalQuery,
} = serversApi;
