import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Server } from "../types/server";

export interface ServersState {
   selected: string | null;
   editing: string | null;
}

const initialState: ServersState = {
   selected: null,
   editing: null,
};

export const serversSlice = createSlice({
   name: "servers",
   initialState,
   reducers: {
      selectServer: (state, action: PayloadAction<string|null>) => {
         state.selected = action.payload;
      },
      edit: (state, action: PayloadAction<string>) => {
         state.editing = action.payload;
      },
      stopEdit: (state) => {
         state.editing = null;
      },
      
   },
});

// Action creators are generated for each case reducer function
export const { selectServer } = serversSlice.actions;
export default serversSlice.reducer;
