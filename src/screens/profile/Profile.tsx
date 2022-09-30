import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useConnect } from "remx";

import { RootStackParamList, ScreenName } from "../../navigation";
import { FeedType } from "../../types";
import { profilesService } from "../../services";
import { profileStore, userStore } from "../../stores";
import { commonStyles } from "../../style-sheets";
import { FeedToggle } from "../../components/feed-toggle";
import { ArticlesList, ArticleListMode } from "../../components/articles-list";
import { NewArticleButton } from "../../components/new-article-button";
import { ProfileActions } from "../../components/profile-actions";

type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.Profile
>;

const PROFILE_FEEDS = [FeedType.Profile, FeedType.Favorite];

export function Profile({ route }: ProfileProps) {
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [activeFeed, setActiveFeed] = useState<FeedType>(FeedType.Profile);
  const { currentUser } = useConnect(userStore.getCurrentUser);
  const { profile } = useConnect(profileStore.getProfile);

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
        {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
        <ProfileActions profile={profile} />
      </View>
      <View style={styles.articleContainer}>
        <FeedToggle
          feeds={PROFILE_FEEDS}
          activeFeed={activeFeed}
          currentUser={currentUser}
          selectFeed={setActiveFeed}
        />
        <ArticlesList
          mode={ArticleListMode.Profile}
          activeFeed={activeFeed}
          username={profile.username}
        />
      </View>
      <View style={styles.newArticleButton}>
        <NewArticleButton />
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
  bio: {
    color: "#fff",
    padding: 8,
    fontSize: 12,
  },
  articleContainer: {
    marginTop: 8,
    flexGrow: 1,
    flexShrink: 0,
  },
  newArticleButton: {
    position: "absolute",
    right: 16,
    bottom: 32,
  },
});
