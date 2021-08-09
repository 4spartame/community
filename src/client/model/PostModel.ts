import { Model } from "./Model";
import { Post, PostComment } from "./structure";
import deepcopy from "deepcopy";

export class PostCollection {
  private posts: Post[] = [];
  constructor() {}

  public addPostsAndComments(posts: Post[], comments: PostComment[]) {
    this.groupComment(posts, comments);
  }

  private groupComment(posts: Post[], comments: PostComment[]) {
    const processedPost = posts.map((post) => {
      const filteredComments = comments.filter(
        ({ postId }) => postId === post.id
      );

      return {
        ...post,
        comments: this.sortComment(filteredComments),
      };
    });

    this.posts = this.posts.concat(processedPost);
  }

  private sortComment(comments: PostComment[]) {
    const noReply = comments.filter(({ replyId }) => !replyId);
    return noReply.reduce((arr, comment) => {
      const replies = comments.filter(({ replyId }) => replyId === comment.id);
      return [...arr, comment, ...replies];
    }, [] as PostComment[]);
  }

  public addComment(comment: PostComment) {
    const postId = comment.postId;
    const post = this.posts.find(({ id }) => id === postId);

    if (!post) return;
    post.comments = this.sortComment([...post.comments, comment]);
  }

  public addPost(post: Post) {
    this.posts.unshift({ ...post, comments: [] });
  }

  public getPosts() {
    return deepcopy(this.posts);
  }

  public getPostById(_id: number) {
    return deepcopy(this.posts.filter(({ id }) => id === _id));
  }

  public getLastCommentId() {
    let lastId = 0;

    this.posts.forEach((post) => {
      post.comments.forEach((comment) => {
        lastId = Math.max(lastId, comment.id);
      });
    });

    return lastId;
  }
}

export enum PostEvent {
  UPDATED_POSTS = "updatedPosts",
}

export class PostModel extends Model {
  private postCollection = new PostCollection();

  constructor() {
    super();
  }

  public getNextPostId() {
    return this.postCollection.getPosts().length + 1;
  }
  public getNextCommendId() {
    return this.postCollection.getLastCommentId() + 1;
  }

  public addComment(comment: PostComment) {
    this.postCollection.addComment(comment);
    this.trigger(PostEvent.UPDATED_POSTS, this.postCollection.getPosts());
  }

  public addPost(post: Post) {
    this.postCollection.addPost(post);
    this.trigger(PostEvent.UPDATED_POSTS, this.postCollection.getPosts());
  }
}
