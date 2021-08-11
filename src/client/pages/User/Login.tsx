import React, { ChangeEventHandler, Component, MouseEventHandler } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../viewModel/Store";
import { login } from "../../viewModel/UserReducer";
import { Redirect, Link, withRouter, RouteComponentProps } from "react-router-dom";

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
          <fieldset className="login-form">
            <div className="field">
              <label htmlFor="userId" className="label">아이디</label>
              <input type="text" className="input" name="userId" id="userId" onChange={this.changeValue} />
            </div>
            <div className="field">
              <label htmlFor="password" className="label">비밀번호</label>
              <input type="password" className="input" name="password" id="password" onChange={this.changeValue} />
            </div>
            <div className="field">
              <button type="submit" className="button is-success" onClick={this.login}>login</button>
            </div>
            <div>
              <Link to="/page/join">join us</Link>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  }

  private login: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    this.props.dispatch(login({ userId: this.state.userId, password: this.state.password }));

  }

  private changeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }
}

export default connect((state: RootState) => ({ state }))(withRouter(Login));