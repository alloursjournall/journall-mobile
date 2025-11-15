import { useState, useEffect } from "react";
import { Tabs } from "expo-router";
import {
  Image,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Platform } from "react-native";
// import { HapticTab } from '@/components/HapticTab';
// import { useColorScheme } from '@/hooks/useColorScheme';
import { appBackground, puddingFooter, grayphite } from "@/constants/Colors";
import {
  HomeIcon,
  HeartIcon,
  OrigamiIcon,
  InfoIcon,
  JournallIcon,
} from "@/constants/Images";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_TOKEN,
} from "@/redux/currentUser/currentUserSlice";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  //

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  // const SHOW_NOTIFICATIONS = useSelector(
  //   (state: RootState) => state.app.SHOW_NOTIFICATIONS
  // );

  const [allUserProfileIcons, setAllUserProfileIcons] = useState<any>([]);

  const {
    returnProfileImg,
    profileIconInitS3,
    //   getUserCredentials,
    //   getCurrentUserWithCurrentUserToken,
  } = useContentFunction();

  //   const iconUri = returnProfileImg(CURRENT_USER?.id, allUserProfileIcons);

  //   useEffect(() => {
  //     const getAllIcons = async () => {
  //       const icons = await profileIconInitS3(setAllUserProfileIcons);
  //       // console.log('icons', icons)
  //     };
  //     getAllIcons();

  //     const currentUserInit = async () => {
  //       const tokenDetails = await getUserCredentials();
  //       console.log("tokenDetails", tokenDetails);
  //       if (parseInt(tokenDetails?.userId) > 0) {
  //         const currentUser = await getCurrentUserWithCurrentUserToken(
  //           tokenDetails
  //         );
  //         dispatch(SET_CURRENT_USER(currentUser));
  //         // CURRENT_USER_TOKEN: { id: 0, username: 'no name', token: 'no token' },
  //         const currentUserToken = {
  //           id: currentUser?.id,
  //           username: currentUser?.username,
  //           token: currentUser?.token,
  //         };
  //         dispatch(SET_CURRENT_USER_TOKEN(currentUserToken));
  //         console.log("currentUser clientside", currentUser);
  //       }
  //       console.log("tokenDetails", tokenDetails);
  //     };
  //     currentUserInit();
  //   }, []);

  //
  const TabIcon = ({ iconUri }: { iconUri?: string | number }) => {
    const isString = typeof iconUri === "string" && iconUri.length > 0;
    return (
      <Image
        source={isString ? { uri: iconUri } : HeartIcon}
        style={{ width: 28, height: 28, margin: 0 }}
      />
    );
  };

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        // tabBarButton: HapticTab,
        tabBarBackground: () => (
          <ScrollView
            style={{
              backgroundColor: puddingFooter,
              height: "100%",
              borderRadius: 6,
              // overflow: 'scroll'

              // flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              // borderWidth: 2, borderColor: 'blue', gap: 0
            }}
          />
        ),
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            padding: 0, // Remove default padding
            margin: 0, // Remove default margin
          },
          default: {
            padding: 0, // Remove default padding
            margin: 0, // Remove default margin

            borderWidth: 2,
            // borderColor: 'red',
          },
        }),
        tabBarItemStyle: {
          width: 80, // Set a specific width for each tab button
          alignItems: "center", // Ensures the icon is centered within the button
        },

        tabBarShowLabel: false, // Disables labels globally
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={HomeIcon}
              style={{ width: 28, height: 28, margin: 0 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="info"
        options={{
          tabBarIcon: ({ color }) => (
            <TouchableOpacity style={styles.addCommentPlusInput}>
              <Text style={styles.addCommentInputText}> i </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="main"
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={JournallIcon}
              style={{ width: 28, height: 28, margin: 0 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile/[id]"
        options={{
          tabBarIcon: () => <TabIcon iconUri={HeartIcon} />,
          //   tabBarIcon: () => <TabIcon iconUri={iconUri} />,
          href: CURRENT_USER?.id
            ? `/profile/${CURRENT_USER.id}`
            : "/profile/default",
        }}
      />

      <Tabs.Screen
        name="upload"
        options={{
          tabBarIcon: ({ color }) => (
            <TouchableOpacity style={styles.addCommentPlusInput}>
              <Text style={styles.addCommentInputText}> + </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addCommentPlusInput: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: -1,
    borderBottomRightRadius: 11,
    borderWidth: 2,
    borderColor: grayphite,
    backgroundColor: appBackground,
  },
  addCommentInputText: {
    fontSize: 30,
    fontWeight: "500",
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
});
