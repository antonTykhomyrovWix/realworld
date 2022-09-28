import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Comment as CommentType } from "../../types";

type CommentProps = Readonly<{
  comment: CommentType;
}>;

export function Comment({ comment }: CommentProps) {
  const date = new Date(comment.createdAt).toLocaleDateString();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{comment.body}</Text>
      <View style={styles.bottom}>
        <Image style={styles.image} source={{ uri: comment.author.image }} />
        <Text style={styles.username}>{comment.author.username}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 8,
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
