import { configureStore } from "@reduxjs/toolkit";

import slideSliceReducer from "@/features/slideSlice";

const store = configureStore({
  reducer: {
    slide: slideSliceReducer,
  },
});

export default store;
