import React, { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NavigationPropRootStack, ScreenName } from "../../navigation";
import { Comment as CommentType } from "../../types";

type CommentProps = Readonly<{
  comment: CommentType;
}>;

export function Comment({ comment }: CommentProps) {
  const navigation = useNavigation<NavigationPropRootStack>();
  const date = new Date(comment.createdAt).toLocaleDateString();

  const onUsernameClick = useCallback(
    () =>
      navigation.navigate(ScreenName.Profile, {
        username: comment.author.username,
      }),
    [comment.author.username, navigation]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{comment.body}</Text>
      <View style={styles.bottom}>
        <Image style={styles.image} source={{ uri: comment.author.image }} />
        <Text onPress={onUsernameClick} style={styles.username}>
          {comment.author.username}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginBottom: 8,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
  },
  bottom: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    padding: 8,
  },
  username: {
    padding: 8,
    color: "#5CB85C",
  },
  date: {
    color: "#bbb",
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
