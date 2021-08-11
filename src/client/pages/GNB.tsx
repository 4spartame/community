import { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../viewModel/Store";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";

type Props = {
  state: RootState,
  dispatch: Dispatch,
} & RouteComponentProps;

class GNB extends Component<Props> {
  public render() {
    return <nav>
      <ul>
        <li>
          <Link to="/page/posts">게시판</Link>
        </li>
        <li>
          <Link to="/page/members">멤버란</Link>
        </li>
        <li>
          <Link to="/page/login">로그인</Link>
        </li>
        <li>
          <Link to="/page/chat">채팅</Link>
        </li>
        <li>
          <Link to="/page/join">회원가입</Link>
        </li>
      </ul>
    </nav>
  }
}

export default connect((state: RootState) => ({ state }))(withRouter(GNB));