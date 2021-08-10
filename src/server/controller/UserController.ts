import { Application, Request, Response } from "express";
import { User } from "../../common/structure";
import { SqlRepository } from "../repositories/SqlRepository";

declare module "express-session" {
  interface SessionData {
    userid: string;
  }
}

const userId = "user";
const password = "0000";

export class UserController {
  private model = new SqlRepository();

  constructor(private app: Application) {
    // this.app.use((req, res, next) => {
    //   if (!req.session.userid) {
    //     res.redirect("/page/login");
    //   } else {
    //     next();
    //   }
    // });

    this.app.get("/api/login", () => {
      // TODO: 세션 로그인 정보 반환
    });

    this.app.post("/api/login", this.login);
    this.app.post("/api/join", async (req: Request, res: Response) => {
      const { userId, name, age, password }: User = req.body;

      // TODO 필수정보 없을때 알러트
      const user = await this.model.addUser({
        userId,
        name,
        age,
        password,
      });
      res.send({ success: true, user });
    });
  }

  private readonly login = (req: Request, res: Response) => {
    if (req.body.userId == userId && req.body.password == password) {
      const session = req.session;
      session.userid = req.body.userId;
      res.send({ success: true, user: { userId } });
    } else {
      res.send({ success: false });
    }
  };
}
