import {
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Post, PostEvent, PostType } from "../model";

export interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

export const updatedPosts = createAction<Post[]>(PostEvent.UPDATED_POSTS);
export const fetchPosts = createAction("fetchPosts");
export const addComment =
  createAction<{ contents: string; postId: number; replyId?: number }>(
    "addComment"
  );
export const addPost =
  createAction<{ contents: string; type: PostType }>("addPost");

const PostReducer = createReducer(initialState, (builder) => {
  builder.addCase(updatedPosts, (state, action: PayloadAction<Post[]>) => {
    state.posts = action.payload;
  });
});

export default PostReducer;
