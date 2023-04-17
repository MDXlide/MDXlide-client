import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  chapters: [
    {
      position: [0, 0],
      userCode:
        "<div style={{padding: '1rem', backgroundColor: 'violet'}}>박스 예시입니다.</div>",
    },
    {
      position: [1, 0],
      userCode: "# 두번째 슬라이드입니다",
    },
    {
      position: [0, 1],
      userCode: "# column 두 번째",
    },
    {
      position: [2, 0],
      userCode: "# 세번째 슬라이드입니다",
    },
    {
      position: [2, 1],
      userCode: "# 세번째의 하위 1번 입니다",
    },
    {
      position: [2, 2],
      userCode: "# 세번째의 하위 2번 입니다",
    },
  ],
};

export const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {
    setChapterText: (state, action) => {
      const { code, row, column } = action.payload;
      const targetChapter = state.chapters.filter(
        (chapter) =>
          chapter.position[0] === row && chapter.position[1] === column,
      )[0];

      targetChapter.userCode = code;
    },
    addRowChapter: (state, action) => {
      const { code, newRow, column } = action.payload;

      state.chapters.push({
        position: [newRow, column],
        userCode: code,
      });
    },
    addcolumnChapter: (state, action) => {
      const { code, row, newColumn } = action.payload;

      state.chapters.push({
        position: [row, newColumn],
        userCode: code,
      });
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

export const { setChapterText, addRowChapter, addcolumnChapter } =
  slideSlice.actions;

export default slideSlice.reducer;
