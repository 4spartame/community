import { ChangeEventHandler, Component, MouseEventHandler } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../viewModel/Store";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { join } from "../../viewModel/UserReducer";

type Props = {
  state: RootState,
  dispatch: Dispatch,
} & RouteComponentProps;


class Join extends Component<Props> {
  public state = {
    userId: "",
    password: "",
    passwordCheck: "",
    name: "",
    age: "",
  };
  public render() {

    const { user } = this.props.state.user;

    if (user) {
      return <main>
        <div className="container">
          가입을 환영합니다.
          <Link to="/page/main">메인으로</Link>
        </div>
      </main>
    }

    return <main>
      <div className="container">
        <form>
          <fieldset className="join-form">
            <div className="field">
              <label id="userId" className="label">아이디</label>
              <input type="text" id="userId" className="input" name="userId" onChange={this.changeValue} />
            </div>
            <div className="field">
              <label id="password" className="label">비밀번호</label>
              <input type="password" id="password" className="input" name="password" onChange={this.changeValue} />
            </div>
            <div className="field">
              <label id="passwordCheck" className="label">비밀번호 확인</label>
              <input type="password" id="passwordCheck" className="input" name="passwordCheck" onChange={this.changeValue} />
            </div>
            <div className="field">
              <label id="name" className="label">이름</label>
              <input type="text" id="name" className="input" name="name" onChange={this.changeValue} />
            </div>
            <div className="field">
              <label id="age" className="label">나이</label>
              <input type="text" id="age" className="input" name="age" onChange={this.changeValue} />
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-success" onClick={this.join}>submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  }

  private changeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  private join: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.dispatch(join(this.state));
  }

}

export default connect((state: RootState) => ({ state }))(withRouter(Join));