import path from "path";
import { Application } from "express";
import { RedisRepository } from "../repositories/RedisRepository";

export class PostController {
  private redis = new RedisRepository();
  constructor(private app: Application) {
    this.app.get("/api/posts", async (req, res) => {
      const { posts, comments } = await this.redis.getPosts();

      res.send({ posts, comments });
    });

    this.app.get("/api/post/:id", async (req, res) => {});

    this.app.delete("/api/post/:id", async (req, res) => {});

    this.app.post("/api/image/", async (req: any, res) => {
      const sampleFile = req.files.file0;
      const filename = `${Date.now()}_${sampleFile.name}`;
      const directory = `/data/images/${filename}`;
      const uploadPath = path.join(__dirname, "../../../" + directory);
      sampleFile.mv(uploadPath, function (err: any) {
        if (err) return res.status(500).send(err);

        res.send({ filename });
      });
    });

    this.app.post("/api/post/", async (req, res) => {
      const post = await this.redis.addPost(req.body);
      res.send(post);
    });

    this.app.post("/api/comment/", async (req, res) => {
      const comment = await this.redis.addComment(req.body);
      res.send(comment);
    });
  }
}
