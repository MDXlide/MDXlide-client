import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  userId: 0,
  slideId: "",
  title: "",
  chapters: [
    {
      position: [0, 0],
      userCode:
        "<div style={{padding: '1rem', backgroundColor: 'violet'}}>박스 예시입니다.</div>",
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
