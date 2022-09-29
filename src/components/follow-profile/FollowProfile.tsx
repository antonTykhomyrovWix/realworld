import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useConnect } from "remx";

import { NavigationPropRootStack, ScreenName } from "../../navigation";
import { profilesService } from "../../services";
import { articlesStore, profileStore, userStore } from "../../stores";

type FollowAuthorProps = Readonly<{
  username: string;
  following: boolean;
}>;

export function FollowProfile({ following, username }: FollowAuthorProps) {
  const navigation = useNavigation<NavigationPropRootStack>();
  const [followLoading, setFollowLoading] = useState<boolean>(false);
  const { currentUser } = useConnect(userStore.getCurrentUser);
  const text = useMemo(
    () =>
      following ? `\u002B Unfollow ${username}` : `\u002B Follow ${username}`,
    [following, username]
  );

  const onFavoriteClick = useCallback(async () => {
    if (!currentUser) {
      return navigation.navigate(ScreenName.SignIn);
    }

    setFollowLoading(true);
    const updatedProfile = following
      ? await profilesService.unfollow(username)
      : await profilesService.follow(username);

    if (updatedProfile) {
      articlesStore.updateAuthors(updatedProfile);
      profileStore.updateProfile(updatedProfile);
    }

    setFollowLoading(false);
  }, [following, username, currentUser, navigation]);

  return (
    <View>
      <TouchableHighlight
        style={[styles.follow, following && styles.followActive]}
        underlayColor="#fff"
        onPress={onFavoriteClick}
        disabled={followLoading}
      >
        {followLoading ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={[styles.followText, following && styles.followActiveText]}
          >
            {text}
          </Text>
        )}
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  follow: {
    borderRadius: 4,
    marginRight: 8,
    padding: 2,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  followActive: {
    borderColor: "#adadad",
    backgroundColor: "#e6e6e6",
  },
  followText: {
    color: "#ccc",
  },
  followActiveText: {
    color: "#373a3c",
  },
});
