import { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addComment } from "../../viewModel/PostReducer";
import { RootState } from "../../viewModel/Store";
import { Post } from "../../model/structure";
import PostCommentItem from "./PostCommentItem";

type Props = {
  state: RootState,
  dispatch: Dispatch,
  post: Post
};

class PostItem extends Component<Props> {
  public state = {
    contents: "",
  };

  public render() {
    const { contents, comments } = this.props.post;

    return <li>
      <div className="post-item">
        <div className="post-contents">
          {contents}
        </div>
        <div className="post-comment">
          <ul className="post-comment-list">
            {comments.map((comment) => <PostCommentItem post={this.props.post} comment={comment} key={comment.id}></PostCommentItem>)}
          </ul>
          <div className="post-comment-form">
            <textarea className="input" onChange={this.updateContents} value={this.state.contents}></textarea>
            <button className="button" onClick={this.addComment}>submit</button>
          </div>
        </div>
      </div>
    </li>
  }

  private updateContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    this.setState({ contents: value })
  }

  private addComment = () => {
    if (!this.state.contents) {
      return;
    }
    this.props.dispatch(addComment({
      postId: this.props.post.id,
      contents: this.state.contents
    }));
    this.setState({ contents: "" });
  }
}

export default connect((state: RootState) => ({ state }))(PostItem);