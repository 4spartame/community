import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../viewModel/Store";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

type Props = {
  state: RootState;
  dispatch: Dispatch;
} & RouteComponentProps;

class MemberList extends Component<Props> {
  public render() {
    return <main>
      <div className="container">
        <h1 className="title">멤버 목록</h1>
        <div>
          <ul>

          </ul>
        </div>
      </div>
    </main>;
  }

}

export default connect((state: RootState) => ({ state }))(withRouter(MemberList));
