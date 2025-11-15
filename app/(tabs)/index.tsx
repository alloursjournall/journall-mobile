import { View, Image, StyleSheet, Platform } from "react-native";

import { appBackground } from "@/constants/Colors";
import LoginSignupForm from "@/components/LoginSignup/LoginSignupForm";
// import SignupInput from "@/components/LoginSignup/Signup/SignupInput";

export default function HomeScreen() {
  return (
    <View style={styles.App}>
      <LoginSignupForm />
    </View>
  );
}

const styles = StyleSheet.create({
  App: {
    backgroundColor: appBackground,
    // backgroundColor: "brown",
    minHeight: "100%",
    minWidth: "100%",
  },
});
