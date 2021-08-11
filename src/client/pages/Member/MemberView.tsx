import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../viewModel/Store";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

type Props = {
  state: RootState;
  dispatch: Dispatch;
} & RouteComponentProps;

class MemberView extends Component<Props> {
  public render() {
    return <div className="member-view">
      <div className="member-summary">
        <div className="member-summary-container">
          <div className="member-info">
            <div className="member-name"></div>
            <div className="member-graph"></div>
            <div className="member-trophy"></div>
          </div>
          <div className="member-image">
            <img src="" />
          </div>
          <div className="member-thumbnail">
            a<br />a<br />a<br />a<br />a<br />a<br />
            <img src="" />
          </div>
          <div className="member-tools"></div>
        </div>
      </div>
      <div className="member-detail">
        <div className="member-desc">
          <div className="container">

            <div className="member-desc-part">
              blablablabla
            </div>
            <div className="member-desc-part">
              blablablabla
            </div>
          </div>
        </div>
        <div className="member-relationship">

          <div className="container">
            <div className="member-relationship-form">
              <textarea className="input"></textarea>
              <button className="button">submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

}

export default connect((state: RootState) => ({ state }))(withRouter(MemberView));
