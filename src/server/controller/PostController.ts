import { Application } from "express";
import { MySqlRepository } from "../repositories/MySqlRepository";

export class PostController {
  private mysql = new MySqlRepository();
  constructor(private app: Application) {
    this.app.get("/json", async (req, res) => {
      res.send({ a: 1 });
    });

    this.mysql.getSolution();
  }
}
