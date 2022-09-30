import React, { useCallback } from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useConnect } from "remx";

import { NavigationPropRootStack, ScreenName } from "../../navigation";
import { userStore } from "../../stores";
import { Profile } from "../../types";
import { FollowProfile } from "../follow-profile";

type ProfileActionsProps = Readonly<{
  profile: Profile;
}>;

export function ProfileActions({ profile }: ProfileActionsProps) {
  const navigation = useNavigation<NavigationPropRootStack>();
  const { currentUser } = useConnect(userStore.getCurrentUser);

  const onLogoutClick = useCallback(() => {
    userStore.logout();
    navigation.navigate(ScreenName.Home);
  }, [navigation]);

  const onEditClick = useCallback(
    () => navigation.navigate(ScreenName.EditProfile),
    [navigation]
  );

  if (currentUser?.username === profile.username) {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.action} onPress={onLogoutClick}>
          <Text style={styles.actionText}>Logout</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.action} onPress={onEditClick}>
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View>
      <FollowProfile
        username={profile.username}
        following={profile.following}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  action: {
    width: 100,
    borderRadius: 4,
    marginRight: 8,
    padding: 2,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#e6e6e6",
  },
  actionText: {
    color: "#373a3c",
    textAlign: "center",
  },
});
