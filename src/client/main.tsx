import './css/index.scss';
import { ViewImpl } from './View';
import { ViewCommand } from "./commands/ViewCommand";
import { PostController } from "./controller/PostController";
import { PostModel } from "./model";
export class Main {
  private postModel = new PostModel();
  private postController = new PostController(this.postModel);
  private viewCommand = new ViewCommand(this.postController);
  private view = new ViewImpl(this.viewCommand)
  constructor() {
    this.view.mount(document.querySelector("#root") as HTMLElement);
    this.postModel.subscribe(this.view);
  }
}