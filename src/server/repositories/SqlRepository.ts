import mysql from "promise-mysql";
import { User, UserLevel } from "../../common/structure";

const pool = mysql.createPool({
  connectionLimit: 5000,
  host: "localhost",
  user: "root",
  password: "0000",
  database: "test",
  multipleStatements: true,
});

export class SqlRepository {
  private connection = pool.then((pool) => {
    return pool.getConnection();
  });
  constructor() {}

  public getSolution() {
    this.connection
      .then((con) => {
        return con.query("SELECT 1 + 1 AS solution");
      })
      .then((result) => {
        console.log("The solution is: ", result[0].solution);
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
