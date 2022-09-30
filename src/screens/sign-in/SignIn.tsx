import React, { useCallback, useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, ScreenName } from "../../navigation";
import { inputsMaxLength, InputsType, validateEmail } from "../../utils";
import { userService } from "../../services";
import { userStore } from "../../stores";
import { commonStyles } from "../../style-sheets";

type SignInProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.SignIn
>;

export function SignIn({ navigation }: SignInProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInLoading, setSignInLoading] = useState<boolean>(false);
  const [error, setErrors] = useState<string | undefined>(undefined);

  const goToSignUp = useCallback(
    () => navigation.navigate(ScreenName.SignUp),
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

    setSignInLoading(true);
    const data = await userService.login(email, password);
    setSignInLoading(false);

    if (!data) {
      setErrors("User is not found");
      return;
    }

    userStore.setCurrentUser(data);
    navigation.goBack();
  }, [validateForm, email, password, navigation]);

  return (
    <View style={commonStyles.flexCenter}>
      {error && <Text style={commonStyles.error}>{error}</Text>}
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
        disabled={signInLoading}
        title="Sign In"
        onPress={signIn}
      />
      <Text style={commonStyles.authenticationText} onPress={goToSignUp}>
        Need an account?
      </Text>
    </View>
  );
}
