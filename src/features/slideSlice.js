import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  text: `가나다`,
};

export const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {
    setSlideText: (state, action) => {
      state.text = `${action.payload}`;
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

export const { setSlideText } = slideSlice.actions;

export default slideSlice.reducer;
