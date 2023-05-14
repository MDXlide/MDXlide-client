import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  userId: 0,
  slideId: "",
  title: "",
  chapters: [
    {
      position: [0, 0],
      userCode: `## 안녕하세요 mdx 문법으로 slide를 제작할 수 있는 MDXSlide입니다.
      <br/>
      ### 슬라이드 추가 : 슬라이드 하단에 + 버튼을 클릭하면 슬라이드를 추가 할 수 있습니다.
      ### 슬라이드 이동 : 슬라이드가 추가되면 이동할 수 있는 버튼이 활성화 됩니다!
      ### Play : 슬라이드를 재생할 수 있어요.
      ### Full : 전체 슬라이드를 확인하고 페이지로 이동할 수 있습니다.
      <br/>
        <div style={{padding: '1rem', backgroundColor: 'violet'}}>박스 예시입니다.</div>`,
    },
  ],
  lastSaveTime: "",
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
    addColumnChapter: (state, action) => {
      const { code, row, newColumn } = action.payload;

      state.chapters.push({
        position: [row, newColumn],
        userCode: code,
      });
    },
    setSlide: (state, action) => {
      const { userId, slideId, title, chapters, lastSaveTime } =
        action.payload.slide;

      state.userId = userId;
      state.slideId = slideId;
      state.title = title;
      state.chapters = chapters;
      state.lastSaveTime = lastSaveTime;
    },
    insertRowChapter: (state, action) => {
      const { code, newRow, column } = action.payload;

      state.chapters.forEach((chapter) => {
        if (chapter.position[0] >= newRow) chapter.position[0] += 1;
      });
      state.chapters.push({
        position: [newRow, column],
        userCode: code,
      });
    },
    insertColumnChapter: (state, action) => {
      const { code, row, newColumn } = action.payload;

      state.chapters.forEach((chapter) => {
        if (chapter.position[1] >= newColumn && chapter.position[0] === row)
          chapter.position[1] += 1;
      });
      state.chapters.push({
        position: [row, newColumn],
        userCode: code,
      });
    },
    deleteRowChapter: (state, action) => {
      const { row } = action.payload;
      const deleteTargetChapter = state.chapters.filter(
        (chapter) => chapter.position[0] !== row,
      );

      deleteTargetChapter.forEach((chapter) => {
        if (chapter.position[0] > row) chapter.position[0] -= 1;
      });
      state.chapters = deleteTargetChapter;
    },
    deleteColumnChapter: (state, action) => {
      const { row, column } = action.payload;
      const deleteTargetChapter = state.chapters.filter(
        (chapter) =>
          chapter.position[0] !== row || chapter.position[1] !== column,
      );

      deleteTargetChapter.forEach((chapter) => {
        if (chapter.position[0] === row && chapter.position[1] > column)
          chapter.position[1] -= 1;
      });
      state.chapters = deleteTargetChapter;
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

export const {
  setChapterText,
  addRowChapter,
  addColumnChapter,
  setSlide,
  insertRowChapter,
  insertColumnChapter,
  deleteRowChapter,
  deleteColumnChapter,
} = slideSlice.actions;

export default slideSlice.reducer;
