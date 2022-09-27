import React, { useCallback, useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, screenName } from "../../navigation";
import { commonStyles } from "../../style-sheets";
import { validateEmail } from "../../utils";
import { userService } from "../../services";
import { userStore } from "../../stores";

type SignUpProps = NativeStackScreenProps<
  RootStackParamList,
  screenName.signUp
>;

export function SignUp({ navigation }: SignUpProps) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUpDisabled, setSignUpDisabled] = useState<boolean>(false);
  const [error, setErrors] = useState<string | undefined>(undefined);

  const goToSignIn = useCallback(
    () => navigation.navigate(screenName.signIn),
    [navigation]
  );

  const validateForm = useCallback((): boolean => {
    if (!username) {
      setErrors("Username can't be blank");
      return false;
    }
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
  }, [username, email, password]);

  const signUp = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setSignUpDisabled(true);
    const data = await userService.register(username, email, password);
    setSignUpDisabled(false);

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
  }, [validateForm, username, email, password, navigation]);

  return (
    <View style={commonStyles.flexCenter}>
      {error && <Text style={commonStyles.error}>{error}</Text>}
      <TextInput
        style={commonStyles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <Button
        color="#5CB85C"
        disabled={signUpDisabled}
        title="Sign Up"
        onPress={signUp}
      />
      <Text style={commonStyles.authenticationText} onPress={goToSignIn}>
        Have an account?
      </Text>
    </View>
  );
}
