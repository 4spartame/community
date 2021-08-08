import { Command } from "./Command";
import { PostController } from "../controller/PostController";

export class ViewCommand implements Command {
  constructor(private controller: PostController) {}

  public trigger(action: string, payload: any) {
    const controllerMethod = (this.controller as any)[action];
    if (controllerMethod) {
      (this.controller as any)[action](payload);
    }
  }
}
