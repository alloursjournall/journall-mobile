// top level imports
import React from "react";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector } from "react-redux";

import { Text, Platform, Image, View, StyleSheet } from "react-native";

// utils:
import { grayphite, grayfight } from "@/constants/Colors";
import { useContentFunction } from "@/Contexts/ContentFunctions";

interface props {
  eventOrActivity: any;
  setEvent: any;
}

const HostingUsersRow: React.FC<props> = ({ eventOrActivity, setEvent }) => {
  const ALL_USERS_ICONS = useSelector(
    (state: RootState) => state.app.ALL_USERS_ICONS
  );

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const { returnProfileImg } = useContentFunction();

  const test = () => {
    console.log("eventOrActivity", eventOrActivity);
  };

  return (
    <View style={styles.hostingUsersColumns}>
      <View style={styles.slightSplitRow}>
        <Image
          style={[{ borderRadius: 50 }, styles.icons]}
          source={returnProfileImg(
            eventOrActivity.hosting_user_id || CURRENT_USER?.id,
            ALL_USERS_ICONS
          )}
        />
        <Text style={styles.headerText}>
          {" "}
          {eventOrActivity?.hosting_username || CURRENT_USER?.username}{" "}
        </Text>
      </View>
      <Text style={styles.captionText}> host </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
    width: "100%",
    paddingVertical: 4,
    paddingHorizontal: 8,
    boxSizing: "border-box",
  },
  hostingUsersColumns: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    overflow: "hidden",
    gap: 2, // React Native doesn't support "gap" yet, but you can use margin for similar effect
  },
  item: {
    flexBasis: "30%", // This will create 3 equal columns
    marginBottom: 2, // This adds spacing between items vertically
    // Add any other styles for your items, e.g., backgroundColor, padding, etc.
  },
  icons: {
    height: 50,
    width: 50,
  },
  iconMini: {
    height: 35,
    width: 35,
  },
  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  headerText: {
    color: grayphite,
    fontSize: 20,
    fontWeight: 400,
    fontFamily: "Fuzzy Bubbles",
  },

  captionText: {
    color: grayfight,
    fontSize: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
});

export default HostingUsersRow;
