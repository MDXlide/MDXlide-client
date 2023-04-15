import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  rowNext: false,
  rowPrev: false,
  columnNext: false,
  columnPrev: false,
};

export const slideAnimationSlice = createSlice({
  name: "slideAnimation",
  initialState,
  reducers: {
    isRowNext: (state, action) => {
      state.rowNext = action.payload;
    },
    isRowPrev: (state, action) => {
      state.rowPrev = action.payload;
    },
    isColumnNext: (state, action) => {
      state.columnNext = action.payload;
    },
    isColumnPrev: (state, action) => {
      state.columnPrev = action.payload;
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

export const { isRowNext, isRowPrev, isColumnNext, isColumnPrev } =
  slideAnimationSlice.actions;

export default slideAnimationSlice.reducer;
