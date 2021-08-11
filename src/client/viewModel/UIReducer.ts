import {
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Post, PostEvent, PostType } from "../model";

export interface UIState {
  posts: Post[];
}

const initialState: UIState = {
  posts: [],
};
const UIReducer = createReducer(initialState, (builder) => {});

export default UIReducer;
