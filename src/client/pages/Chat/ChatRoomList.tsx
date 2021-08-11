import React, { ChangeEventHandler, Component, MouseEventHandler } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../viewModel/Store";
import { Link } from "react-router-dom";


type Props = {
  state: RootState;
  dispatch: Dispatch;
};

/*
roomKey 목록 가져오기

room진입시 해당 방의 대화내용 전부 가져오기
*/

class ChatRoomList extends Component<Props> {
  public state = { chatRoomKeys: [] };

  public componentDidMount() {
    fetch("http://localhost:8080/api/chatRooms", {
      method: "GET",
    }).then((res) => {
      return res.json();
    }).then((chatRoomKeys) => {
      this.setState({ chatRoomKeys });
    })
  }

  public render() {
    const { chatRoomKeys } = this.state;
    return <ul>
      {
        chatRoomKeys.map(({ chatRoomId }, i) => (
          <li key={i}><Link to={`/page/chat/${chatRoomId}`}>room{i + 1}</Link></li>))
      }
    </ul>;
  }

}


export default connect((state: RootState) => ({ state }))(ChatRoomList);
