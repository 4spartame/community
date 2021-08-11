import { PostModel, PostType } from "../model";

const API_PATH = "http://0.0.0.0:8080/api";

export class PostController {
  constructor(private model: PostModel) {}

  public async addPost(payload: {
    contents: string | FormData;
    type: PostType;
  }) {
    let contents = "";

    if (typeof payload.contents === "string") {
      contents = payload.contents;
    } else {
      const res = await fetch(`${API_PATH}/image`, {
        method: "POST",
        body: payload.contents,
      });
      const { filename } = await res.json();
      contents = filename;
    }

    const result = await fetch(`${API_PATH}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents, type: payload.type }),
    });
    const post = await result.json();

    this.model.addPost(post);
  }

  public async addComment(payload: {
    contents: string;
    postId: number;
    replyId?: number;
  }) {
    const result = await fetch(`${API_PATH}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const comment = await result.json();

    this.model.addComment(comment);
  }

  public async fetchPosts() {
    const result = await fetch(`${API_PATH}/posts`, {
      method: "GET",
    });
    const { posts, comments } = await result.json();

    this.model.replacePostsAndComments(posts, comments);
  }
}
