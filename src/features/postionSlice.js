import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  row: 0,
  column: 0,
};

export const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setRow: (state, action) => {
      const newRow = action.payload;

      state.row = newRow;
    },
    setColumn: (state, action) => {
      const newColumn = action.payload;

      state.column = newColumn;
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

export const { setRow, setColumn } = positionSlice.actions;

export default positionSlice.reducer;
