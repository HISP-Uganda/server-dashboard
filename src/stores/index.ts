import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { serversSlice } from "./servers";
import { serversApi, useGetAllServersQuery } from "../services/servers";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Server } from "../types/server";

export const store = configureStore({
   reducer: {
      servers: serversSlice.reducer,
      [serversApi.reducerPath]: serversApi.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serversApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// custom hook to get the servers state
export const useServers = () => {
   const dispatch = useDispatch();
   const { isLoading, data: servers, isError } = useGetAllServersQuery();
   const selected = useSelector((state: RootState) => state.servers.selected);
   const current = servers?.find((server) => server.id === selected);
   const selectServer = (id: string|null) => dispatch(serversSlice.actions.selectServer(id));
   const currentEdit = useSelector((state: RootState) => state.servers.editing);
   const currentEditServer = servers?.find((server) => server.id === currentEdit);
   const edit = (id: string) => dispatch(serversSlice.actions.edit(id));
   const stopEdit = () => dispatch(serversSlice.actions.stopEdit());
   return { servers, selected, selectServer, current, edit, stopEdit, currentEdit, currentEditServer, isLoading };
};
