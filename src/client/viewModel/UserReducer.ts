import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { User, UserEvent } from "../model";

export interface UserState {
  user?: User;
}

const initialState: UserState = {};

export const login =
  createAction<{ userId: string; password: string }>("login");
export const join =
  createAction<Omit<User, "joinDate" | "id" | "level">>("join");
export const getLogin = createAction("getLogin");
export const updatedLoginSession = createAction<User>(
  UserEvent.UPDATED_LOGIN_SESSION
);
const UserReducer = createReducer(initialState, (builder) => {
  builder.addCase(updatedLoginSession, (state, action: PayloadAction<User>) => {
    state.user = action.payload;
  });
});

export default UserReducer;
