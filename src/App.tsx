import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useConnect } from "remx";

import { userStore } from "./stores";
import { userService } from "./services";
import { Navigation } from "./navigation";

export function App() {
  const isLoading = useConnect(userStore.getLoading);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await userService.getCurrent();
      if (user) {
        userStore.setCurrentUser(user);
      }
      userStore.setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator /> : <Navigation />}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
