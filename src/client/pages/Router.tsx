import { render } from "@testing-library/react";
import { Component } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"
import Post from "./Post/Post";
import Join from "./User/Join";
import Login from "./User/Login";

class RouterApp extends Component {

  public componentDidMount() {

  }

  public render() {
    return <Router>
      <Switch>
        <Route path="/page/posts">
          <Post></Post>
        </Route>
        <Route path="/page/login">
          <Login></Login>
        </Route>
        <Route path="/page/join">
          <Join></Join>
        </Route>
      </Switch>
    </Router>
  }
}


export default RouterApp;