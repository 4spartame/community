import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostReply } from "./structure";

export interface CounterState {
  posts: Post[];
}

const initialState: CounterState = {
  posts: [],
};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    increment: (state) => {},
    decrement: (state) => {},
    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
});

export const { increment, decrement, incrementByAmount } = PostSlice.actions;

export default PostSlice.reducer;
