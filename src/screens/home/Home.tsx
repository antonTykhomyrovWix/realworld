import React from "react";
import { Text, View, Button } from "react-native";

export function Home({ navigation }) {
  return (
    <View>
      <Text>Home!</Text>
      <Button
        title="Open Article Page"
        onPress={() => navigation.navigate("Article")}
      />
    </View>
  );
}
