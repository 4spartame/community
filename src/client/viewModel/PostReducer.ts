import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostType } from "../model";

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
    addPost: (
      state,
      { payload }: PayloadAction<{ type: PostType; contents: string }>
    ) => {
      const id = state.posts.length + 1;
      const post = {
        ...payload,
        id,
        ownerId: 1,
        categoryId: 1,
        comments: [],
        createTime: Date.now(),
        updateTime: Date.now(),
      };
    },
    addComment: (
      state,
      {
        payload,
      }: PayloadAction<{ postId: number; contents: string; replyId?: number }>
    ) => {
      const { postId, contents } = payload;
      const comments =
        state.posts.find(({ id }) => id === postId)?.comments || [];
      const id = comments.length + 1;
      const comment = {
        id,
        ownerId: 1,
        categoryId: 1,
        replyId: 0,
        createTime: Date.now(),
        updateTime: Date.now(),
        ...payload,
      };
    },
  },
});

export const { addPost, addComment } = PostSlice.actions;

export default PostSlice.reducer;
