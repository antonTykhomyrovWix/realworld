import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, screenName } from "../../navigation";
import { profilesService, userService } from "../../services";
import { profileStore, userStore } from "../../stores";
import { commonStyles } from "../../style-sheets";
import { Profile as ProfileType } from "../../types";
import { useConnect } from "remx";
import { FollowProfile } from "../../components/follow-profile";

type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  screenName.profile
>;

export function Profile({ navigation, route }: ProfileProps) {
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  // TODO:useConnect type error
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );
  // @ts-ignore
  const profile = useConnect<ProfileType | undefined, []>(
    profileStore.getProfile
  );

  const goToSignIn = useCallback(
    () => navigation.navigate(screenName.signIn),
    [navigation]
  );

  useEffect(() => {
    const fetchProfile = async () => {
      setProfileLoading(true);
      const fetchedProfile = await profilesService.getProfile(
        route.params.username
      );

      if (fetchedProfile) {
        profileStore.setProfile(fetchedProfile);
      }

      setProfileLoading(false);
    };

    fetchProfile();
  }, [route.params.username]);

  const onLogout = useCallback(async () => {
    setLogoutLoading(true);
    await userService.logout();
    userStore.setCurrentUser(undefined);
    setLogoutLoading(false);

    navigation.navigate(screenName.home);
  }, [navigation]);

  if (profileLoading || !profile) {
    return (
      <View style={commonStyles.flexCenter}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: profile.image }} />
        <Text style={styles.username}>{profile.username}</Text>
        <View>
          {currentUser?.username === profile.username ? (
            <Button
              color="#5CB85C"
              disabled={logoutLoading}
              title="Logout"
              onPress={onLogout}
            />
          ) : (
            <FollowProfile
              username={profile.username}
              following={profile.following}
              goToSignIn={goToSignIn}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 8,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#333",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    color: "#fff",
    padding: 8,
    fontSize: 18,
    fontWeight: "700",
  },
});
