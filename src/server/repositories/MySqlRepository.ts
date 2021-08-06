import mysql from "promise-mysql";

const pool = mysql.createPool({
  connectionLimit: 5000,
  host: "localhost",
  user: "root",
  password: "0000",
  database: "test",
  multipleStatements: true,
});

export class MySqlRepository {
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
}
