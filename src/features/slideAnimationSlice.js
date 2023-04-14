import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  rowAnimation: false,
  columnAnimation: false,
};

export const slideAnimationSlice = createSlice({
  name: "slideAnimation",
  initialState,
  reducers: {
    isRowAnimation: (state, action) => {
      state.rowAnimation = action.payload;
    },
    isColumnAnimation: (state, action) => {
      state.subPosition = action.payload;
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

export const { isRowAnimation, isColumnAnimation } =
  slideAnimationSlice.actions;

export default slideAnimationSlice.reducer;
