import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  flexCenter: {
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
  authenticationText: {
    color: "#5CB85C",
    marginTop: 20,
  },
});
