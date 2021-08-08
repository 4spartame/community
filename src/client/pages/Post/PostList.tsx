import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addPost } from '../../viewModel/PostReducer';
import { RootState } from '../../viewModel/Store';
import { PostType } from "../../viewModel/structure";
import PostItem from './PostItem';

type Props = {
  state: RootState,
  dispatch: Dispatch
};

class PostList extends Component<Props> {
  public state = { postType: PostType.NOTICE, contents: "" };
  public render() {
    const { postType, contents } = this.state;
    const { posts } = this.props.state.post;

    return (
      <div className="post-list">
        <div>
          게시판 목록
        </div>
        <div>
          <button onClick={this.selectPostType(PostType.IMAGE)}>image</button>
          <button onClick={this.selectPostType(PostType.YOUTUBE)}>youtube</button>
          <button onClick={this.selectPostType(PostType.NOTICE)}>notice</button>
        </div>
        <div className="content-input">
          {
            (postType === PostType.IMAGE) ? (
              <div>
                <h2>이미지</h2>
                <input type="file"></input>
              </div>) : null
          }
          {
            (postType === PostType.YOUTUBE) ? (
              <div>
                <h2>Youtube 링크</h2>
                <input type="text"></input>
              </div>) : null
          }
          {
            (postType === PostType.NOTICE) ? (
              <div>
                <h2>공지사항</h2>
                <textarea className="input" onChange={this.onChangeContent} value={contents}></textarea>
              </div>) : null
          }
        </div>
        <div>
          <button className="button is-small is-rounded is-success" onClick={this.onSubmit}>submit</button>
        </div>
        <ul>
          {posts.map(post => <PostItem post={post} key={post.id}></PostItem>)}
        </ul>
      </div>
    );
  }

  private onChangeContent = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ contents: value });
  }

  private selectPostType = (postType: PostType) => () => {
    this.setState({ postType });
  }

  private onSubmit = () => {
    if (!this.state.contents) {
      return;
    }
    this.props.dispatch(addPost({ type: this.state.postType, contents: this.state.contents }));
    this.setState({ contents: "" });
  }
}



export default connect((state: RootState) => ({ state }))(PostList);