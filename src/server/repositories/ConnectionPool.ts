import mysql from "promise-mysql";
export class ConnectionPool {
  private static pool = mysql.createPool({
    connectionLimit: 5000,
    host: "localhost",
    user: "root",
    password: "0000",
    database: "test",
    multipleStatements: true,
  });

  public static getConnection() {
    return this.pool.then((pool) => {
      return pool.getConnection();
    });
  }
}
