import { API_URL } from "./constants";
import { User } from "../types";

const headers = new Headers({ "content-type": "application/json" });

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
      headers,
      method: "POST",
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    const { errors, user } = await response.json();

    if (errors) {
      return Object.entries(errors).join(": ");
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
      headers,
      method: "POST",
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    });
    const { errors, user } = await response.json();

    if (errors) {
      return Object.entries(errors).join(";\n");
    }

    // assert typeguard
    return user;
  }
}

export const userService = new UserService();
