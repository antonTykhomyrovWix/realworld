import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useConnect } from "remx";

import { NavigationPropRootStack, ScreenName } from "../../navigation";
import { Comment as CommentType } from "../../types";
import { commentsService } from "../../services";
import { articlesStore, commentsStore, userStore } from "../../stores";

type CommentProps = Readonly<{
  comment: CommentType;
}>;

export function Comment({ comment }: CommentProps) {
  const navigation = useNavigation<NavigationPropRootStack>();
  const { currentUser } = useConnect(userStore.getCurrentUser);
  const { article } = useConnect(articlesStore.getOpenArticle);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const date = new Date(comment.createdAt).toLocaleDateString();
  const commentOwner = comment.author.username === currentUser?.username;

  const onUsernameClick = useCallback(
    () =>
      navigation.navigate(ScreenName.Profile, {
        username: comment.author.username,
      }),
    [comment.author.username, navigation]
  );

  const onRemoveComment = useCallback(async () => {
    if (!article) {
      return;
    }

    setRemoveLoading(true);
    const removed = await commentsService.removeComment(
      article.slug,
      comment.id
    );
    if (removed) {
      commentsStore.removeComment(comment.id);
    }

    setRemoveLoading(false);
  }, [article, comment.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{comment.body}</Text>
      <View style={styles.bottom}>
        <Image style={styles.image} source={{ uri: comment.author.image }} />
        <Text onPress={onUsernameClick} style={styles.username}>
          {comment.author.username}
        </Text>
        <Text style={styles.date}>{date}</Text>
        {commentOwner && (
          <View style={styles.remove}>
            <Button
              onPress={onRemoveComment}
              title={"\uD83D\uDDD1"}
              disabled={removeLoading}
            />
          </View>
        )}
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
  remove: {
    position: "absolute",
    right: 16,
  },
});
