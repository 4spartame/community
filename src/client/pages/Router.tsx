import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"
import Post from "./Post/Post";
import Login from "./User/Login";

export default function RouterApp() {
  return <Router>
    <Switch>
      <Route path="/page/posts">
        <Post></Post>
      </Route>
      <Route path="/page/login">
        <Login></Login>
      </Route>
    </Switch>
  </Router>
}