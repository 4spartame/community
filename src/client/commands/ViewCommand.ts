import { Command } from "./Command";
import { PostController } from "../controller/PostController";

export class ViewCommand implements Command {
  constructor(private controllers: any[]) {}

  public trigger(action: string, payload: any) {
    this.controllers.forEach((controller) => {
      const controllerMethod = (controller as any)[action];
      if (controllerMethod) {
        (controller as any)[action](payload);
      }
    });
  }
}
