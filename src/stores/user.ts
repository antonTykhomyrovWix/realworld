import { state, setters, getters } from "remx";

import { User } from "../types";
import { userService } from "../services";

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

  setCurrentUser(currentUser: User) {
    userState.currentUser = currentUser;
  },

  logout() {
    userState.currentUser = undefined;
    userService.logout();
  },
});

const userGetters = getters({
  getLoading() {
    return userState.loading;
  },

  getCurrentUser(): { currentUser?: User } {
    const { currentUser } = userState;
    return { currentUser };
  },
});

export const userStore = {
  ...userSetters,
  ...userGetters,
};
