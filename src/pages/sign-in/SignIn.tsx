import React from "react";
import { Text, View, Button } from "react-native";

export function SignIn() {
  return (
    <View>
      <Text>Sign In!</Text>
      <Button title="Sign In" onPress={() => console.log("Sign In")} />
      <Text>or</Text>
      <Button title="Sign Up" onPress={() => console.log("Sign Up")} />
    </View>
  );
}
