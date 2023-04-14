import { configureStore } from "@reduxjs/toolkit";

import slideSliceReducer from "@/features/slideSlice";
import positionReducer from "@/features/postionSlice";

const store = configureStore({
  reducer: {
    slide: slideSliceReducer,
    position: positionReducer,
  },
});

export default store;
