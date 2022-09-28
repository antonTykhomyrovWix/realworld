import { userStore } from "../stores";

export function getHeaders(): Headers {
  const currentUser = userStore.getCurrentUser();
  const headers = new Headers({
    "content-type": "application/json",
  });

  if (currentUser?.token) {
    headers.set("authorization", `Token: ${currentUser.token}`);
  }

  return headers;
}
