import { Model } from "./Model";
import deepcopy from "deepcopy";
import { User } from "./structure";

export enum UserEvent {
  UPDATED_LOGIN_SESSION = "updatedLoginSession",
}

export class UserModel extends Model {
  private user!: User;

  constructor() {
    super();
  }

  public updatedLoginSession(user: User) {
    this.user = user;
    this.trigger(UserEvent.UPDATED_LOGIN_SESSION, deepcopy(this.user));
  }
}
