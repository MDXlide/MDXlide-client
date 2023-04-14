import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  mainPosition: 0,
  subPosition: 0,
};

export const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setMainPosition: (state, action) => {
      const newMainPosition = action.payload;

      state.mainPosition = newMainPosition;
    },
    setSubPosition: (state, action) => {
      const newSubPosition = action.payload;

      state.subPosition = newSubPosition;
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

export const { setMainPosition, setSubPosition } = positionSlice.actions;

export default positionSlice.reducer;
