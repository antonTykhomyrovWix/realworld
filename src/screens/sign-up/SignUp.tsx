import React, { useCallback, useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, ScreenName } from "../../navigation";
import { commonStyles } from "../../style-sheets";
import { inputsMaxLength, InputsType, validateEmail } from "../../utils";
import { userService } from "../../services";
import { userStore } from "../../stores";

type SignUpProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.SignUp
>;

export function SignUp({ navigation }: SignUpProps) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  const [error, setErrors] = useState<string | undefined>(undefined);

  const goToSignIn = useCallback(
    () => navigation.navigate(ScreenName.SignIn),
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

    setSignUpLoading(true);
    const user = await userService.register(username, email, password);
    setSignUpLoading(false);

    if (!user) {
      setErrors("Can not create user");
      return;
    }

    userStore.setCurrentUser(user);
    navigation.navigate(ScreenName.Home);
  }, [validateForm, username, email, password, navigation]);

  return (
    <View style={commonStyles.flexCenter}>
      {error && <Text style={commonStyles.error}>{error}</Text>}
      <TextInput
        style={commonStyles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        maxLength={inputsMaxLength[InputsType.Username]}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        maxLength={inputsMaxLength[InputsType.Email]}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        maxLength={inputsMaxLength[InputsType.Password]}
      />
      <Button
        color="#5CB85C"
        disabled={signUpLoading}
        title="Sign Up"
        onPress={signUp}
      />
      <Text style={commonStyles.authenticationText} onPress={goToSignIn}>
        Have an account?
      </Text>
    </View>
  );
}
