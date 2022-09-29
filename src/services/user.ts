import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../types";
import { API_URL } from "./constants";
import { getHeaders } from "./headers";

const STORAGE_KEY_CURRENT_USER = "@realworld_test_app.current_user";

//TODO: add try/catch
class UserService {
  async getCurrent(): Promise<User | undefined> {
    const userFromLocalStorage = await this.getCurrentUserFromStorage();

    if (userFromLocalStorage) {
      return userFromLocalStorage;
    }

    const response = await fetch(`${API_URL}/user`, {
      headers: getHeaders(),
    });
    const { user, status } = await response.json();

    if (status === "Error") {
      return undefined;
    }

    // assert typeguard
    return user;
  }

  async login(email: string, password: string): Promise<User | string> {
    const response = await fetch(`${API_URL}/users/login`, {
      headers: getHeaders(),
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

    await this.setCurrentUserToStorage(user);

    // assert typeguard
    return user;
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    } catch (error) {
      console.error(error);
    }
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<User | string> {
    const response = await fetch(`${API_URL}/users`, {
      headers: getHeaders(),
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

  private async setCurrentUserToStorage(user: User) {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem(STORAGE_KEY_CURRENT_USER, jsonValue);
    } catch (error) {
      console.error(error);
    }
  }

  private async getCurrentUserFromStorage(): Promise<User | undefined> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY_CURRENT_USER);
      return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch (error) {
      console.error(error);
    }
  }
}

export const userService = new UserService();
