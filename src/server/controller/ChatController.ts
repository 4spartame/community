import { Application, Request, Response } from "express";
import { ChatRepository } from "../repositories/ChatRepository";

declare module "express-session" {
  interface SessionData {
    loginId: number;
  }
}

export class ChatController {
  private model = new ChatRepository();

  constructor(private app: Application) {
    app.get("/api/chatRooms", async (req: Request, res: Response) => {
      // if (!req.session.loginId) {
      //   res.send([]);
      // }

      const rooms = await this.model.getChatRoomKeysByUserId(
        1 //req.session.loginId as number
      );
      res.send(rooms);
    });
  }
}
