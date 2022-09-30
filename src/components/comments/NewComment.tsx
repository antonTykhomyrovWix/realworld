import React, { useCallback, useState } from "react";
import { Image, StyleSheet, TextInput, View, Button } from "react-native";

import { inputsMaxLength, InputsType } from "../../utils";

type NewCommentProps = Readonly<{
  postComment: (comment: string) => Promise<void>;
}>;

const USER_IMAGE_URI = "https://api.realworld.io/images/smiley-cyrus.jpeg";

export function NewComment({ postComment }: NewCommentProps) {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    const comment = text.trim();
    if (comment.length < 1) {
      return;
    }
    setLoading(true);

    await postComment(comment);

    setText("");
    setLoading(false);
  }, [postComment, text]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write a comment..."
        onChangeText={setText}
        value={text}
        multiline={true}
        maxLength={inputsMaxLength[InputsType.Comment]}
      />
      <View style={styles.bottom}>
        <Image style={styles.image} source={{ uri: USER_IMAGE_URI }} />
        <Button
          onPress={onSubmit}
          color="#5CB85C"
          disabled={loading}
          title="Post Comment"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  bottom: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 60,
    padding: 8,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
