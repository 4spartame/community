import { Application } from "express";

declare module "express-session" {
  interface SessionData {
    userid: string;
  }
}

const userId = "user";
const password = "0000";

export class UserController {
  constructor(private app: Application) {
    // this.app.use((req, res, next) => {
    //   if (!req.session.userid) {
    //     res.redirect("/page/login");
    //   } else {
    //     next();
    //   }
    // });

    this.app.post("/api/login", (req, res) => {
      if (req.body.userId == userId && req.body.password == password) {
        const session = req.session;
        session.userid = req.body.userId;
        res.send({ success: true, user: { userId } });
      } else {
        res.send({ success: false });
      }
    });
  }
}
