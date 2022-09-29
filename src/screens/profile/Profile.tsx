import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, ScreenName } from "../../navigation";
import { profilesService } from "../../services";
import { profileStore, userStore } from "../../stores";
import { commonStyles } from "../../style-sheets";
import { FeedType, Profile as ProfileType } from "../../types";
import { useConnect } from "remx";
import { FollowProfile } from "../../components/follow-profile";
import { FeedToggle } from "../../components/feed-toggle";
import { ArticlesList } from "../../components/articles-list";

type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.Profile
>;

const PROFILE_FEEDS = [FeedType.Profile, FeedType.Favorite];

export function Profile({ navigation, route }: ProfileProps) {
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [activeFeed, setActiveFeed] = useState<FeedType>(FeedType.Profile);
  // TODO:useConnect type error
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );
  // @ts-ignore
  const profile = useConnect<ProfileType | undefined, []>(
    profileStore.getProfile
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
    await userStore.logout();
    setLogoutLoading(false);

    navigation.navigate(ScreenName.Home);
  }, [navigation]);

  if (profileLoading || !profile) {
    return (
      <View style={commonStyles.flexCenter}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
            />
          )}
        </View>
      </View>
      <View style={styles.articleContainer}>
        <FeedToggle
          feeds={PROFILE_FEEDS}
          activeFeed={activeFeed}
          currentUser={currentUser}
          selectFeed={setActiveFeed}
        />
        <ArticlesList activeFeed={activeFeed} username={profile.username} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  header: {
    padding: 8,
    alignItems: "center",
    flexShrink: 1,
    flexGrow: 0,
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
  articleContainer: {
    marginTop: 8,
    flexGrow: 1,
    flexShrink: 0,
  },
});
