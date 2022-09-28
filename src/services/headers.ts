import { userStore } from "../stores";

export function getHeaders(): Headers {
  const currentUser = userStore.getCurrentUser();
  const headers = new Headers({
    "content-type": "application/json",
    "cache-control": "no-cache",
  });

  if (currentUser?.token) {
    headers.set("authorization", `Token ${currentUser.token}`);
  }

  return headers;
}
