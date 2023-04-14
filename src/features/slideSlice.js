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

export const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {
    setChapterText: (state, action) => {
      const { code, mainPosition, subPosition } = action.payload;
      const targetChapter = state.chapters.filter(
        (chapter) =>
          chapter.position[0] === mainPosition &&
          chapter.position[1] === subPosition,
      )[0];

      targetChapter.userCode = code;
    },
    addMainChapter: (state, action) => {
      const { code, newMainPosition, subPosition } = action.payload;

      state.chapters.push({
        position: [newMainPosition, subPosition],
        userCode: code,
      });
    },
    addSubChapter: (state, action) => {
      const { code, mainPosition, newSubPosition } = action.payload;

      state.chapters.push({
        position: [mainPosition, newSubPosition],
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

export const { setChapterText, addMainChapter, addSubChapter } =
  slideSlice.actions;

export default slideSlice.reducer;
