import React, { ChangeEventHandler, Component, MouseEventHandler } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../viewModel/Store";
import ChatRoomList from "./ChatRoomList";
import {
  Switch,
  Route,
} from "react-router-dom"
import ChatRoom from "./ChatRoom";


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

  public render() {
    return <main>
      <div className="container">
        <Switch>
          <Route path="/page/chat/:id">
            <ChatRoom></ChatRoom>
          </Route>
          <Route path="/page/chat/">
            <ChatRoomList></ChatRoomList>
          </Route>
        </Switch>
      </div>
    </main>;
  }

}


export default connect((state: RootState) => ({ state }))(Chat);
