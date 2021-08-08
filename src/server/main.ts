import express from "express";
import path from "path";
import util from "util";
import fs from "fs";
import { PostController } from "./controller/PostController";
const readFileAsync = util.promisify(fs.readFile);

const DEFAULT_PORT = 8080;
const DEFAULT_HOST = "0.0.0.0";

export class Main {
  private app = express();
  private postController = new PostController(this.app);
  constructor() {
    this.setMiddleware();
    this.route();
  }

  public listen() {
    this.app.listen(DEFAULT_PORT, DEFAULT_HOST, () => {
      console.log(`START = http://${DEFAULT_HOST}:${DEFAULT_PORT}/main`);
    });
  }

  private setMiddleware() {
    this.app.use(
      "/static",
      express.static(path.join(__dirname, "../../build/static/"))
    );

    this.app.use((req, res, next) => {
      console.log(req), next();
    });
  }

  private route() {
    this.app.get("/main*", async (req, res) => {
      const html = await readFileAsync(
        path.join(__dirname, "../../build/index.html")
      );
      res.send(html.toString());
    });
  }
}
