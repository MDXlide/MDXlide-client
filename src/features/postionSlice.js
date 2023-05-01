import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  row: 0,
  column: 0,
  version: 0,
};

export const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setRow: (state, action) => {
      const newRow = action.payload;

      state.row = newRow;
      state.version += 1;
    },
    setColumn: (state, action) => {
      const newColumn = action.payload;

      state.column = newColumn;
      state.version += 1;
    },
    setVersion: (state, action) => {
      state.version += 1;
      console.log(state.version);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setRow, setColumn, setVersion } = positionSlice.actions;

export default positionSlice.reducer;
