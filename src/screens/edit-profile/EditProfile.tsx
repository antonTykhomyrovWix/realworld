import React, { useCallback, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useConnect } from "remx";

import { RootStackParamList, ScreenName } from "../../navigation";
import { userService } from "../../services";
import { profileStore, userStore } from "../../stores";
import { commonStyles } from "../../style-sheets";
import { validateUrl, inputsMaxLength, InputsType } from "../../utils";

type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.EditProfile
>;

export function EditProfile({ navigation }: ProfileProps) {
  const { currentUser } = useConnect(userStore.getCurrentUser);
  const [saving, setSaving] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>(currentUser?.email ?? "");
  const [username, setUsername] = useState<string>(currentUser?.username ?? "");
  const [bio, setBio] = useState<string>(currentUser?.bio ?? "");
  const [image, setImage] = useState<string>(currentUser?.image ?? "");
  const [error, setErrors] = useState<string | undefined>(undefined);

  const validateForm = useCallback((): boolean => {
    if (!username) {
      setErrors("Username can't be blank");
      return false;
    }
    if (!email) {
      setErrors("Email can't be blank");
      return false;
    }
    if (!image || !validateUrl(image)) {
      setErrors("Image is invalid");
      return false;
    }

    return true;
  }, [username, email, image]);

  const getUserForm = useCallback(() => {
    const form = {
      password,
      email,
      username,
      bio,
      image,
    };

    return Object.fromEntries(
      Object.entries(form).filter(([_, value]) => !!value)
    ) as typeof form;
  }, [password, email, username, bio, image]);

  const onSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    const form = getUserForm();
    const updatedUser = await userService.updateCurrent(form);

    if (updatedUser) {
      userStore.setCurrentUser(updatedUser);
      profileStore.updateProfile({
        username: updatedUser.username,
        bio: updatedUser.bio,
        image: updatedUser.image,
        following: false,
      });
      navigation.goBack();
    }

    setSaving(false);
  }, [navigation, getUserForm, validateForm]);

  const onSignInClick = useCallback(() => {
    navigation.navigate(ScreenName.SignIn);
  }, [navigation]);

  if (!currentUser) {
    return (
      <View style={commonStyles.flexCenter}>
        <Button color="#5CB85C" title="Sign In" onPress={onSignInClick} />
      </View>
    );
  }

  return (
    <View style={commonStyles.flexCenter}>
      {error && <Text style={commonStyles.error}>{error}</Text>}
      <TextInput
        style={commonStyles.input}
        placeholder="URL of profile picture"
        onChangeText={setImage}
        value={image}
        maxLength={inputsMaxLength[InputsType.Image]}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Username?"
        onChangeText={setUsername}
        value={username}
        maxLength={inputsMaxLength[InputsType.Username]}
      />
      <TextInput
        style={[commonStyles.input, styles.bioInput]}
        multiline={true}
        placeholder="Short bio about you"
        onChangeText={setBio}
        value={bio}
        maxLength={inputsMaxLength[InputsType.Bio]}
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
        placeholder="New Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        maxLength={inputsMaxLength[InputsType.Password]}
      />
      <Button
        color="#5CB85C"
        disabled={saving}
        title="Update Settings"
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bioInput: {
    height: 120,
  },
});
