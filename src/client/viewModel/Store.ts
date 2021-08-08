import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "./PostReducer";

const store = configureStore({
  reducer: {
    post: PostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
