import React, { useCallback, useState } from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, screenName } from "../../navigation";
import { validateEmail } from "../../utils";
import { userService } from "../../services";
import { userStore } from "../../stores";

type SignInProps = NativeStackScreenProps<
  RootStackParamList,
  screenName.signIn
>;

export function SignIn({ navigation }: SignInProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInDisabled, setSignInDisabled] = useState<boolean>(false);
  const [error, setErrors] = useState<string | undefined>(undefined);

  const goToSignUp = useCallback(
    () => navigation.navigate(screenName.signUp),
    [navigation]
  );

  const validateForm = useCallback((): boolean => {
    if (!email) {
      setErrors("Email can't be blank");
      return false;
    }
    if (!validateEmail(email)) {
      setErrors("Email is not valid");
      return false;
    }
    if (!password) {
      setErrors("Password can't be blank");
      return false;
    }

    return true;
  }, [email, password]);

  const signIn = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setSignInDisabled(true);
    const data = await userService.login(email, password);
    setSignInDisabled(false);

    if (typeof data === "string") {
      setErrors(data);
      return;
    }

    if (!data) {
      setErrors("User is not found");
      return;
    }

    userStore.setCurrentUser(data);
    navigation.navigate(screenName.home);
  }, [validateForm, email, password, navigation]);

  return (
    <View style={styles.view}>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <Button
        color="#5CB85C"
        disabled={signInDisabled}
        title="Sign In"
        onPress={signIn}
      />
      <Text style={styles.signUpText} onPress={goToSignUp}>
        Need an account?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#B85C5C",
  },
  input: {
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: "#55595c",
    borderRadius: 3,
    padding: 5,
    marginBottom: 10,
  },
  signUpText: {
    color: "#5CB85C",
    marginTop: 20,
  },
});
