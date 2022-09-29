import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useConnect } from "remx";

import { User } from "../../types";
import { profilesService } from "../../services";
import { articlesStore, profileStore, userStore } from "../../stores";

type FollowAuthorProps = Readonly<{
  username: string;
  following: boolean;
  goToSignIn: () => void;
}>;

export function FollowAuthor({
  following,
  username,
  goToSignIn,
}: FollowAuthorProps) {
  const [followLoading, setFollowLoading] = useState<boolean>(false);
  // TODO:useConnect type error
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );
  const text = useMemo(
    () =>
      following ? `\u002B Unfollow ${username}` : `\u002B Follow ${username}`,
    [following, username]
  );

  const onFavoriteClick = useCallback(async () => {
    if (!currentUser) {
      return goToSignIn();
    }

    setFollowLoading(true);
    const updatedAuthor = following
      ? await profilesService.unfollow(username)
      : await profilesService.follow(username);

    if (updatedAuthor) {
      articlesStore.updateAuthor(updatedAuthor);
      profileStore.updateProfile(updatedAuthor);
    }

    setFollowLoading(false);
  }, [following, username, currentUser, goToSignIn]);

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
