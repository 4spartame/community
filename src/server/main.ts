import express, { Application, Request } from "express";
import path from "path";
import util from "util";
import fs from "fs";
import { PostController } from "./controller/PostController";
import fileUpload from "express-fileupload";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import { UserController } from "./controller/UserController";
import FileStore from "session-file-store";
import cors from "cors";
import websocket from "express-ws";
import { ChatController } from "./controller/ChatController";
const readFileAsync = util.promisify(fs.readFile);

const DEFAULT_PORT = 8080;
const DEFAULT_HOST = "0.0.0.0";

export class Main {
  private app = express() as any as Application;
  private ws = websocket(this.app).app;
  private postController!: PostController;
  private userController!: UserController;
  private chatController!: ChatController;
  constructor() {
    this.setMiddleware();
    this.route();
    this.postController = new PostController(this.app);
    this.userController = new UserController(this.app);
    this.chatController = new ChatController(this.ws);
  }

  public listen() {
    this.app.listen(DEFAULT_PORT, DEFAULT_HOST, () => {
      console.log(`START = http://${DEFAULT_HOST}:${DEFAULT_PORT}/page/main`);
    });
  }

  private setMiddleware() {
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );

    this.app.use(cookieParser());
    this.app.use(
      sessions({
        secret: "mysecretkey",
        saveUninitialized: true,
        cookie: { secure: false },
        resave: false,
        store: new (FileStore(sessions))(),
      })
    );

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
