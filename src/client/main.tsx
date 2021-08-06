import React from 'react';
import ReactDOM from 'react-dom';
import PostList from './pages/Post/PostList';
import { Provider } from "react-redux";
import store from "./model/Store";
import './css/index.css';
export class Main {
  constructor() {

    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <PostList />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
}