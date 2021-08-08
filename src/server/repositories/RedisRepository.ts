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
    this.get("posts").then((postsStr: string) => {
      const posts = JSON.parse(postsStr) || [];
      posts.push({
        ...postData,
        ownerId: 1,
        categoryId: 1,
        comments: [],
        createTime: Date.now(),
        updateTime: Date.now(),
      });
      return this.set("posts", posts);
    });
  }

  public getPosts(start: number, count: number) {
    this.get("posts").then((postsStr: string) => {
      const posts = JSON.parse(postsStr) || [];
    });

    Promise.all;
  }
}
