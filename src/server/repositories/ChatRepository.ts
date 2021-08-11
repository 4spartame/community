import { ConnectionPool } from "./ConnectionPool";

export class ChatRepository {
  private connection = ConnectionPool.getConnection();

  public getChatRoomKeysByUserId(userId: number) {
    return this.connection
      .then((con) => {
        return con.query(`SELECT * FROM chatRoomKey WHERE userId='${userId}'`);
      })
      .then((result) => {
        return result;
      });
  }

  public getChatsByRoomKey({ chatRoomId }: { chatRoomId: number }) {
    return this.connection
      .then((con) => {
        return con.query(`SELECT * FROM chat WHERE chatRoomId='${chatRoomId}'`);
      })
      .then((result) => {
        return result;
      });
  }
}
