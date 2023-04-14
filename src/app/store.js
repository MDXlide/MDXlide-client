import { configureStore } from "@reduxjs/toolkit";

import slideSliceReducer from "@/features/slideSlice";
import positionReducer from "@/features/postionSlice";
import slideAnimationReducer from "@/features/slideAnimationSlice";

const store = configureStore({
  reducer: {
    slide: slideSliceReducer,
    position: positionReducer,
    slideAnimation: slideAnimationReducer,
  },
});

export default store;
