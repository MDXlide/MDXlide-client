import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  chapters: [
    {
      position: [0, 0],
      userCode:
        "<div style={{padding: '1rem', backgroundColor: 'violet'}}>박스 예시입니다.</div>",
    },
  ],
};

export const nowSlideSlice = createSlice({
  name: "nowSlide",
  initialState,
  reducers: {
    setChapterText: (state, action) => {
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

export const { setChapterText } = nowSlideSlice.actions;

export default nowSlideSlice.reducer;
