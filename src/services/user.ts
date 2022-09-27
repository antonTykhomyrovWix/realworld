import { API_URL } from "./constants";
import { User } from "../types";

//TODO: add try/catch

class UserService {
  async getCurrent(): Promise<User | undefined> {
    const response = await fetch(`${API_URL}/user`);

    console.log("!!!response getCurrent", response);

    if (isOk(response)) {
      const { user, status } = await response.json();

      if (status === "Error") {
        return undefined;
      }

      // assert typeguard
      return user;
    }

    return undefined;
  }

  async login(email: string, password: string): Promise<User | string> {
    const user = {
      email,
      password,
    };
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify({ user }),
    });

    if (isOk(response)) {
      const data = await response.json();

      if (data.errors) {
        return data.errors.toString();
      }

      return data.user;
    }

    return "Something went wrong";
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<User | string> {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (isOk(response)) {
      const { user, errors } = await response.json();

      if (errors) {
        return errors.toString();
      }

      // assert typeguard
      return user;
    }

    return "Something went wrong";
  }
}

export const userService = new UserService();

function isOk(response: Response): boolean {
  return response.status === 200 && response.ok;
}
