import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"
import Post from "./Post/Post";

export default function RouterApp() {
  return <Router>
    <Switch>
      <Route path="/page/posts">
        <Post></Post>
      </Route>
    </Switch>
  </Router>
}