import { Application, Request, Response } from "express";
import { User } from "../../common/structure";
import { UserRepository } from "../repositories/UserRepository";

declare module "express-session" {
  interface SessionData {
    loginId: number;
  }
}

const userId = "user";
const password = "0000";

export class UserController {
  private model = new UserRepository();

  constructor(private app: Application) {
    this.app.get("/api/login", this.getLogin);
    this.app.post("/api/login", this.login);
    this.app.post("/api/join", this.join);
  }

  private readonly getLogin = async (req: Request, res: Response) => {
    if (req.session.loginId) {
      const { password: _, ...user } = await this.model.getUserById(
        req.session.loginId
      );
      res.send({ success: true, user });
    } else {
      res.send({ success: false });
    }
  };

  private readonly join = async (req: Request, res: Response) => {
    const { userId, name, age, password }: User = req.body;

    // TODO 필수정보 없을때 알러트
    const user = await this.model.addUser({
      userId,
      name,
      age,
      password,
    });
    req.session.loginId = user.id;
    res.send({ success: true, user });
  };

  private readonly login = async (req: Request, res: Response) => {
    const { userId, password } = req.body;
    const { password: _, ...user } = await this.model.verifyUser(
      userId,
      password
    );

    if (user) {
      req.session.loginId = user.id;
      console.log(req.session);
      res.send({ success: true, user });
    } else {
      res.send({ success: false });
    }
  };
}
