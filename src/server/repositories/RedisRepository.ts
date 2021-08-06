import redis from "redis";
const { promisify } = require("util");

export class RedisRepository {
  private client = redis.createClient();
  public get = promisify(this.client.get).bind(this.client);
  public set = promisify(this.client.set).bind(this.client);
  public hset = promisify(this.client.hset).bind(this.client);
  public hkeys = promisify(this.client.hkeys).bind(this.client);
  constructor() {}
}
