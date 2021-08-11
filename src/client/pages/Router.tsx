import { Component } from "react";
import { connect } from "react-redux";
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"
import { Dispatch } from "redux";
import { RootState } from "../viewModel/Store";
import { getLogin } from "../viewModel/UserReducer";
import GNB from "./GNB";
import MemberList from "./Member/MemberList";
import MemberView from "./Member/MemberView";
import Post from "./Post/Post";
import Join from "./User/Join";
import Login from "./User/Login";

type Props = {
  state: RootState,
  dispatch: Dispatch,
};

class RouterApp extends Component<Props> {

  public componentDidMount() {
    this.props.dispatch(getLogin());
  }

  public render() {
    return <Router>
      <Switch>
        <Route path="/page/posts">
          <Post></Post>
        </Route>
        <Route path="/page/members">
          <MemberList></MemberList>
        </Route>
        <Route path="/page/member/:id">
          <MemberView></MemberView>
        </Route>
        <Route path="/page/login">
          <Login></Login>
        </Route>
        <Route path="/page/join">
          <Join></Join>
        </Route>
      </Switch>
      <GNB></GNB>
    </Router>
  }
}


export default connect((state: RootState) => ({ state }))(RouterApp);