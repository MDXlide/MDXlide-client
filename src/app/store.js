import { configureStore } from "@reduxjs/toolkit";

import slideSliceReducer from "@/features/slideSlice";
import positionReducer from "@/features/postionSlice";
import slideAnimationReducer from "@/features/slideAnimationSlice";
import modalReducer from "@/features/modalSlice";

const store = configureStore({
  reducer: {
    slide: slideSliceReducer,
    position: positionReducer,
    slideAnimation: slideAnimationReducer,
    modal: modalReducer,
  },
});

export default store;
