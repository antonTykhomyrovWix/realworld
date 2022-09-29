import { state, setters, getters } from "remx";

import { Profile } from "../types";

type ProfileState = {
  loading: boolean;
  profile: Profile | undefined;
};

const initialProfileState = {
  loading: true,
  profile: undefined,
};

const profileState = state<ProfileState>(initialProfileState);

const profileSetters = setters({
  setLoading(isLoading: boolean) {
    profileState.loading = isLoading;
  },

  setProfile(profile: Profile | undefined) {
    profileState.profile = profile;
  },

  updateProfile(profile: Profile) {
    if (profileState.profile?.username === profile.username) {
      profileState.profile = profile;
    }
  },
});

const profileGetters = getters({
  getLoading() {
    return profileState.loading;
  },

  getProfile(): { profile?: Profile } {
    const { profile } = profileState;
    return { profile };
  },
});

export const profileStore = {
  ...profileSetters,
  ...profileGetters,
};
