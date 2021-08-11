import path from "path";
import { Application, Request, Response } from "express";
import { RedisRepository } from "../repositories/RedisRepository";

export class PostController {
  private redis = new RedisRepository();
  constructor(private app: Application) {
    this.app.delete("/api/post/:id", async (req, res) => {});
    this.app.patch("/api/comment/:id", async (req, res) => {});
    this.app.get("/api/posts", this.getPost);
    this.app.post("/api/image/", this.addImage);
    this.app.post("/api/post/", this.addPost);
    this.app.post("/api/comment/", this.addComment);
  }

  private readonly getPost = async (req: Request, res: Response) => {
    const { posts, comments } = await this.redis.getPosts();

    res.send({ posts, comments });
  };

  private readonly addPost = async (req: Request, res: Response) => {
    const post = await this.redis.addPost(req.body);
    res.send(post);
  };

  private readonly addComment = async (req: Request, res: Response) => {
    const comment = await this.redis.addComment(req.body);
    res.send(comment);
  };

  private readonly addImage = async (req: Request, res: Response) => {
    const sampleFile = (req.files as any).file0;
    const filename = `${Date.now()}_${sampleFile.name}`;
    const directory = `/data/images/${filename}`;
    const uploadPath = path.join(__dirname, "../../../" + directory);
    sampleFile.mv(uploadPath, function (err: any) {
      if (err) return res.status(500).send(err);

      res.send({ filename });
    });
  };
}
