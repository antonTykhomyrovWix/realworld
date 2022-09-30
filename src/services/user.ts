import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../types";
import { RestAPI } from "./restAPI";

type UserResponse = Readonly<{
  user?: User;
}>;

const USERS_API_PATH = "/users";
const USER_API_PATH = "/user";
const STORAGE_KEY_CURRENT_USER = "@realworld_test_app.current_user";

type UpdateUserForm = Readonly<{
  email: string;
  username: string;
  image: string;
  password?: string;
  bio?: string;
}>;

class UserService extends RestAPI {
  protected alertErrorTitle = "User Service Error";

  async getCurrent(): Promise<User | undefined> {
    const userFromLocalStorage = await this.getCurrentUserFromStorage();

    if (userFromLocalStorage) {
      return userFromLocalStorage;
    }

    const response = await this.get<UserResponse>(USER_API_PATH);

    if (response instanceof Error) {
      // user is not logged. It's ok to return undefined(no current user)
      return undefined;
    }

    return response.user;
  }

  async updateCurrent(user: UpdateUserForm): Promise<User | undefined> {
    const response = await this.put<UserResponse>(USER_API_PATH, { user });

    if (response instanceof Error) {
      // user is not logged. It's ok to return undefined(no current user)
      return undefined;
    }

    if (response.user) {
      await this.setCurrentUserToStorage(response.user);
    }

    return response.user;
  }

  async login(email: string, password: string): Promise<User | undefined> {
    const user = {
      email,
      password,
    };
    const response = await this.post<UserResponse>(`${USERS_API_PATH}/login`, {
      user,
    });

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't login`);
      return undefined;
    }

    if (response.user) {
      await this.setCurrentUserToStorage(response.user);
    }

    return response.user;
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = {
      username,
      email,
      password,
    };
    const response = await this.post<UserResponse>(`${USERS_API_PATH}`, {
      user,
    });

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't register`);
      return undefined;
    }

    if (response.user) {
      await this.setCurrentUserToStorage(response.user);
    }

    return response.user;
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    } catch (e) {
      const error = new Error(e?.toString() ?? "Generic AsyncStorage Error");
      this.showErrorAlert(error, `Can't logout: ${JSON.stringify(error)}`);
    }
  }

  private async setCurrentUserToStorage(user: User) {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem(STORAGE_KEY_CURRENT_USER, jsonValue);
    } catch (e) {
      const error = new Error(e?.toString() ?? "Generic AsyncStorage Error");
      this.showErrorAlert(
        error,
        `Can't set user to storage: ${JSON.stringify(error)}`
      );
    }
  }

  private async getCurrentUserFromStorage(): Promise<User | undefined> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY_CURRENT_USER);
      return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch (e) {
      const error = new Error(e?.toString() ?? "Generic AsyncStorage Error");
      this.showErrorAlert(
        error,
        `Can't load user from storage: ${JSON.stringify(error)}`
      );
    }
  }
}

export const userService = new UserService();
