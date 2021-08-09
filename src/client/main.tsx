import './css/index.scss';
import { ViewImpl } from './View';
import { ViewCommand } from "./commands/ViewCommand";
import { PostController } from "./controller/PostController";
import { PostModel } from "./model";
import { UserModel } from './model/UserModel';
import { UserController } from './controller/UserController';
export class Main {
  private postModel = new PostModel();
  private userModel = new UserModel();
  private postController = new PostController(this.postModel);
  private userController = new UserController(this.userModel);
  private viewCommand = new ViewCommand([this.postController, this.userController]);
  private view = new ViewImpl(this.viewCommand)
  constructor() {
    this.view.mount(document.querySelector("#root") as HTMLElement);
    this.postModel.subscribe(this.view);
    this.userModel.subscribe(this.view);
  }
}