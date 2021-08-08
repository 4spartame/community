import { Application } from "express";
import { RedisRepository } from "../repositories/RedisRepository";

export class PostController {
  private redis = new RedisRepository();
  constructor(private app: Application) {
    this.app.get("/api/posts", async (req, res) => {});
    this.app.get("/api/post/:id", async (req, res) => {});
    this.app.delete("/api/post/:id", async (req, res) => {});
    this.app.post("/api/post/", async (req, res) => {
      this.redis.addPost(req.body);
    });
  }
}
