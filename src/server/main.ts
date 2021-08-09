import express from "express";
import path from "path";
import util from "util";
import fs from "fs";
import { PostController } from "./controller/PostController";
import fileUpload from "express-fileupload";
const readFileAsync = util.promisify(fs.readFile);

const DEFAULT_PORT = 8080;
const DEFAULT_HOST = "0.0.0.0";

export class Main {
  private app = express();
  private postController!: PostController;
  constructor() {
    this.setMiddleware();
    this.route();
    this.postController = new PostController(this.app);
  }

  public listen() {
    this.app.listen(DEFAULT_PORT, DEFAULT_HOST, () => {
      console.log(`START = http://${DEFAULT_HOST}:${DEFAULT_PORT}/page/main`);
    });
  }

  private setMiddleware() {
    this.app.all("/*", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type, Origin, Accept"
      );
      next();
    });

    this.app.use(
      "/static",
      express.static(path.join(__dirname, "../../build/static/"))
    );
    this.app.use(
      "/static",
      express.static(path.join(__dirname, "../../data/"))
    );

    // parse application/x-www-form-urlencoded
    this.app.use(express.urlencoded({ extended: false }));

    // parse application/json
    this.app.use(express.json());

    // this.app.use((req, res, next) => {
    //   console.log(req);
    //   next();
    // });

    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
  }

  private route() {
    this.app.get("/page*", async (req, res) => {
      const html = await readFileAsync(
        path.join(__dirname, "../../build/index.html")
      );
      res.send(html.toString());
    });
  }
}
