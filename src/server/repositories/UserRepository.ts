import { User, UserLevel } from "../../common/structure";
import { ConnectionPool } from "./ConnectionPool";

export class UserRepository {
  private connection = ConnectionPool.getConnection();

  public getUserById(id: number) {
    return this.connection
      .then((con) => {
        return con.query(`SELECT * FROM user WHERE id='${id}'`);
      })
      .then((result) => {
        return result[0];
      });
  }

  public verifyUser(userId: string, password: string) {
    return this.connection
      .then((con) => {
        return con.query(
          `SELECT * FROM user WHERE userid='${userId}' AND password='${password}'`
        );
      })
      .then((result) => {
        return result[0];
      });
  }

  public addUser(user: Omit<User, "id" | "level" | "joinDate">) {
    let querySet = "";
    const makeUser = {
      ...user,
      joinDate: Date.now(),
      level: UserLevel.MEMBER,
    };

    for (let key in makeUser) {
      const val: string = (makeUser as any)[key];
      querySet += `${key}='${val}',`;
    }

    querySet = querySet.slice(0, -1);

    return this.connection
      .then((con) => {
        return Promise.all([
          con.query(`INSERT INTO user SET ${querySet}`),
          con,
        ]);
      })
      .then(([res, con]) => {
        return con.query(`SELECT * FROM user WHERE id='${res.insertId}'`);
      })
      .then((result) => {
        return result[0];
      });
  }
}
