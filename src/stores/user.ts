import { state, setters, getters } from "remx";

import { User } from "../types";

type UserState = {
  loading: boolean;
  currentUser: User | undefined;
};

const initialUserState = {
  loading: true,
  currentUser: undefined,
};

const userState = state<UserState>(initialUserState);

const userSetters = setters({
  setLoading(isLoading: boolean) {
    userState.loading = isLoading;
  },

  setCurrentUser(currentUser: User | undefined) {
    userState.currentUser = currentUser;
  },
});

const userGetters = getters({
  getLoading() {
    return userState.loading;
  },

  getCurrentUser() {
    return userState.currentUser;
  },
});

export const userStore = {
  ...userSetters,
  ...userGetters,
};
