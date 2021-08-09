import redis from "redis";
const { promisify } = require("util");

export class RedisRepository {
  private client = redis.createClient();
  public get = promisify(this.client.get).bind(this.client);
  public set = promisify(this.client.set).bind(this.client);
  public hset = promisify(this.client.hset).bind(this.client);
  public hkeys = promisify(this.client.hkeys).bind(this.client);
  constructor() {}

  public addPost(postData: { type: string; contents: string }) {
    return this.get("posts")
      .then((postsStr: string) => {
        const posts = JSON.parse(postsStr) || [];
        const post = {
          ...postData,
          id: posts.length + 1,
          ownerId: 1,
          categoryId: 1,
          createTime: Date.now(),
          updateTime: Date.now(),
        };
        posts.push(post);
        return Promise.all([this.set("posts", JSON.stringify(posts)), post]);
      })
      .then(([_, post]: any) => {
        return post;
      });
  }

  public addComment({
    replyId,
    ...commentData
  }: {
    postId: number;
    replyId?: number;
    contents: string;
  }) {
    return this.get("comments")
      .then((commentsStr: string) => {
        const comments = JSON.parse(commentsStr) || [];
        const comment = {
          id: this.getLastId(comments) + 1,
          ownerId: 1,
          categoryId: 1,
          createTime: Date.now(),
          updateTime: Date.now(),
          ...commentData,
          replyId: replyId || 0,
        };
        comments.push(comment);
        return Promise.all([
          this.set("comments", JSON.stringify(comments)),
          comment,
        ]);
      })
      .then(([_, comment]: any) => {
        return comment;
      });
  }

  private getLastId<T extends { id: number }>(list: T[]) {
    return list.reduce((acc, tar) => {
      return Math.max(tar.id, acc);
    }, 0);
  }

  public getPosts(start: number, count: number) {
    return this.get("posts").then((postsStr: string) => {
      const posts = JSON.parse(postsStr) || [];

      return posts;
    });
  }
}
