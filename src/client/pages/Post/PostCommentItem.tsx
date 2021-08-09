import { ChangeEvent, Component } from "react";
import { RootState } from "../../viewModel/Store";
import { Post, PostComment } from "../../model/structure";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { addComment } from "../../viewModel/PostReducer";

type Props = {
  state: RootState,
  dispatch: Dispatch,
  comment: PostComment,
  post: Post,
};

class PostCommentItem extends Component<Props> {
  public state = {
    contents: "",
    toggleReply: false,
  }
  public render() {
    const { contents, replyId } = this.props.comment;
    const { toggleReply } = this.state;
    return <li>
      <div className={`post-comment-item ${replyId !== 0 ? "is-reply" : ""}`}>
        <div className="post-comment-info">
          {replyId === 0 ? <button onClick={this.toggleReply}>reply</button> : null}
        </div>
        <div className="post-comment-contents">
          {contents}
        </div>
      </div>
      {
        (replyId === 0 && toggleReply) ? (
          <div className="post-comment-reply-form">
            <textarea className="input" onChange={this.updateContents} value={this.state.contents}></textarea>
            <button className="button" onClick={this.addComment}>submit</button>
          </div>) : null
      }
    </li>
  }
  private updateContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    this.setState({ contents: value })
  }

  private toggleReply = () => {
    this.setState({ toggleReply: !this.state.toggleReply })
  }

  private addComment = () => {
    if (!this.state.contents) {
      return;
    }
    this.props.dispatch(addComment({
      postId: this.props.post.id,
      replyId: this.props.comment.id,
      contents: this.state.contents
    }));
    this.setState({ contents: "", toggleReply: false });
  }
}

export default connect((state: RootState) => ({ state }))(PostCommentItem);