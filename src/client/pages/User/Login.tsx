import React, { ChangeEventHandler, Component, MouseEventHandler } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../viewModel/Store";
import { login } from "../../viewModel/UserReducer";
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";

type Props = {
  state: RootState,
  dispatch: Dispatch,
} & RouteComponentProps;


class Login extends Component<Props> {
  public state = {
    userId: "",
    password: "",
  };

  public render() {
    const { user } = this.props.state.user;

    if (user) {
      const params = new URLSearchParams(this.props.location.search).get("url");
      return <Redirect to={params || "/page/main"} />;
    }

    return <main>
      <div className="container">
        <form>
          <div>
            <label htmlFor="userId">user id</label>
            <input type="text" name="userId" id="userId" onChange={this.changeValue} />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" onChange={this.changeValue} />
          </div>
          <div>
            <button type="submit" onClick={this.login}>login</button>
            <button onClick={this.signUp}>sign up</button>
            <button onClick={this.findPassword}>find password</button>
          </div>
        </form>
      </div>
    </main>
  }

  private login: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    this.props.dispatch(login({ userId: this.state.userId, password: this.state.password }));

  }
  private findPassword: MouseEventHandler<HTMLButtonElement> = (e) => {

  };
  private signUp: MouseEventHandler<HTMLButtonElement> = (e) => {
  };

  private changeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }
}

export default connect((state: RootState) => ({ state }))(withRouter(Login));