import React, { ChangeEventHandler, Component, MouseEventHandler } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../viewModel/Store";


type Props = {
  state: RootState;
  dispatch: Dispatch;
};

/*
roomKey 목록 가져오기

room진입시 해당 방의 대화내용 전부 가져오기
*/

class Chat extends Component<Props> {
  public state = { text: "" };

  public componentDidMount() {
  }

  public render() {
    return <main>
      <div className="container">
        <input type="text" className="input" name="text" onChange={this.changeValue}></input>
        <button className="is-success button" onClick={this.submit}>submit</button>
      </div>
    </main>;
  }

  private readonly changeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  private readonly submit: MouseEventHandler<HTMLButtonElement> = (e) => {
  }

}


export default connect((state: RootState) => ({ state }))(Chat);
