// top level imports
import axios from "axios";
import React from "react";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector } from "react-redux";

import {
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import EventHome from "./EventHome";

// utils:
import { hothazel, grayfight } from "@/constants/Colors";
import { RedBackArrowIcon } from "@/constants/Images";
import { useContentFunction } from "Contexts/ContentFunctions";

// utils:

// 🚨 🚨 <GoingToEventStatus/> if user sees their own EventAttendance item can update it from here though EventHome 1 click away no need

interface props {
  event: any;
  allUserProfileIcons: any;
}

const EventAttendance: React.FC<props> = ({ event, allUserProfileIcons }) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  // 🚨 🚨 🚨 {eventAttendance} should sort and show CURRENT_USER attendance first and friends I
  const eventAttendance =
    (Array.isArray(event?.eventattendance) && event?.eventattendance) || null;
  // const ALL_USERS_ICONS = useSelector((state: RootState) => state.allOrAny.ALL_USERS_ICONS)

  const { returnProfileImg } = useContentFunction();

  const test = () => {
    console.log("event", event);
  };

  const testItem = (item: any) => {
    console.log("event", event);
    console.log("item", item);
  };

  const deleteAttendance = () => {
    // 🚨 🚨  delete my attendance from the event so it doesn't pop on my profile
  };

  return (
    <ScrollView contentContainerStyle={styles.outerAttendanceCont}>
      {
        // 🚨 🚨 🚨 should sort and show CURRENT_USER attendance first and friends I
        eventAttendance?.map((mapitem: any, index: number) => {
          return (
            <View style={styles.attendanceCont}>
              <View style={styles.slightSplitRow}>
                <Image
                  style={styles.profileIcon}
                  source={returnProfileImg(
                    mapitem?.user_id,
                    allUserProfileIcons
                  )}
                />
                <Text style={styles.attendanceText}> {mapitem?.username} </Text>
              </View>

              <Text style={styles.attendanceTextGoing}> {mapitem?.going} </Text>
              <Text style={styles.attendanceTextGoing}>
                {" "}
                {mapitem?.status}{" "}
              </Text>
              <TouchableOpacity onPress={deleteAttendance}>
                {CURRENT_USER?.id === mapitem?.user_id && (
                  <Image style={styles.profileIcon} source={RedBackArrowIcon} />
                )}
              </TouchableOpacity>
              {/* 🚨 🚨 is verified */}
            </View>
          );
        }) ?? <> </>
      }
    </ScrollView>
    // <button onClick={test}> test </button>
  );
};

const styles = StyleSheet.create({
  outerAttendanceCont: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    gap: 5,
    padding: 10,
  },

  attendanceCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    // padding: 0.5rem 1rem;
    // box-sizing: border-box;
  },

  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  profileIcon: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },

  attendanceText: {
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    color: hothazel,
    margin: 0,
    padding: 0,
    lineHeight: 1,
    fontSize: 18,
  },

  attendanceTextGoing: {
    fontFamily: "Fuzzy Bubbles",
    color: grayfight,
    margin: 0,
    padding: 0,
    lineHeight: 1,
    fontSize: 14,
  },
});

export default EventAttendance;
