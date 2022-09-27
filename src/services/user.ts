import { API_URL } from "./constants";
import { User } from "../types";

//TODO: add try/catch

class UserService {
  async getCurrent(): Promise<User | undefined> {
    const response = await fetch(`${API_URL}/user`);
    const { user, status } = await response.json();

    if (status === "Error") {
      return undefined;
    }

    // assert typeguard
    return user;
  }

  async login(email: string, password: string): Promise<User | string> {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const { user, errors } = await response.json();

    if (errors) {
      return errors.toString();
    }

    // assert typeguard
    return user;
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

    const { user, errors } = await response.json();

    if (errors) {
      return errors.toString();
    }

    // assert typeguard
    return user;
  }
}

export const userService = new UserService();
