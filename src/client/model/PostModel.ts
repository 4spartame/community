import { Model } from "./Model";
import { Post, PostComment } from "./structure";

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
    const noReply = comments.filter(({ replyId }) => !!replyId);
    return noReply.reduce((arr, comment) => {
      const replies = comments.filter(({ replyId }) => replyId === comment.id);
      return [...arr, comment, ...replies];
    }, [] as PostComment[]);
  }

  public addComment(postId: number, comment: PostComment) {
    const post = this.posts.find(({ id }) => id === postId);

    if (!post) return;
    post.comments = this.sortComment([...post.comments, comment]);
  }

  public addPost(post: Post) {
    this.posts.push(post);
  }

  public getPosts() {
    return this.posts;
  }

  public getPostById(_id: number) {
    return this.posts.filter(({ id }) => id === _id);
  }
}

export class PostModel extends Model {
  private postCollection = new PostCollection();

  constructor() {
    super();
  }

  public addComment(postId: number, comment: PostComment) {
    this.postCollection.addComment(postId, comment);
    this.trigger("updatedPosts", this.postCollection.getPosts());
  }

  public addPost(post: Post) {
    this.postCollection.addPost(post);
    this.trigger("updatedPosts", this.postCollection.getPosts());
  }
}
