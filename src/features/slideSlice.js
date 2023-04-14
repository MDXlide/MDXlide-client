import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  text: `<div style={{padding: '1rem', backgroundColor: 'violet'}}>
  박스 예시입니다.
</div>`,
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
