import { userStore } from "../stores";
import { Alert } from "react-native";

export const API_URL = "https://api.realworld.io/api";

const enum SupportedMethods {
  Get = "GET",
  POST = "POST",
  DELETE = "DELETE",
}
const ERROR_OK_BUTTON = { text: "OK" };

export abstract class RestAPI {
  protected abstract readonly alertErrorTitle: string;

  protected async get<T>(url: string): Promise<T | Error> {
    return await this.request(SupportedMethods.Get, url);
  }

  protected async post<T>(url: string, data?: object): Promise<T | Error> {
    return await this.request(SupportedMethods.POST, url, data);
  }

  protected async delete<T>(url: string): Promise<T | Error> {
    return await this.request(SupportedMethods.DELETE, url);
  }

  protected showErrorAlert(error: Error, message: string): void {
    Alert.alert(this.alertErrorTitle, `${message}\n${error.message}`, [
      ERROR_OK_BUTTON,
    ]);
  }

  private async request<T>(
    method: SupportedMethods,
    url: string,
    body?: object
  ): Promise<T | Error> {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        method,
        headers: this.headers,
        body: JSON.stringify(body),
      });

      // handle logout
      if (response.status === 401) {
        await userStore.logout();
        return new Error("User session is ended. Please Sign In again");
      }

      const json = await response.json();

      if (!response.ok) {
        return new Error(Object.entries(json.errors).join("; "));
      }

      return json;
    } catch (error) {
      return new Error(error?.toString() ?? "Generic Error");
    }
  }

  private get headers(): Headers {
    const { currentUser } = userStore.getCurrentUser();
    const headers = new Headers({
      "content-type": "application/json",
      "cache-control": "no-cache",
    });

    if (currentUser?.token) {
      headers.set("authorization", `Token ${currentUser.token}`);
    }

    return headers;
  }
}
