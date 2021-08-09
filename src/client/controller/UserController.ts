import { UserModel } from "../model";

const API_PATH = "http://0.0.0.0:8080/api";

export class UserController {
  constructor(private model: UserModel) {}

  public async login(payload: { userId: string; password: string }) {
    const res = await fetch(`${API_PATH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const { success, user } = await res.json();

    if (success) {
      this.model.updatedLoginSession(user);
    } else {
      // TODO
    }
  }
}
