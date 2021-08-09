import { combineReducers, configureStore, Dispatch } from "@reduxjs/toolkit";
import PostReducer, { PostState } from "./PostReducer";
import logger from "redux-logger";
import { ViewImpl } from "../View";

const createEventMiddleWare =
  (eventTrigger: ViewImpl) => (_: any) => (next: Dispatch) => (action: any) => {
    let result = next(action);
    eventTrigger.trigger(action.type, action.payload);
    return result;
  };

export function initStore(view: ViewImpl) {
  return configureStore({
    reducer: combineReducers({
      post: PostReducer,
    }),
    middleware: [logger, createEventMiddleWare(view)],
  });
}

export type RootState = {
  post: PostState;
};
export default initStore;
